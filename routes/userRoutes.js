const router = require('express').Router()
const { User, Friends, Relationship, ForgotPassword, RelationshipFollowing } = require('../models')
const jwt = require('jsonwebtoken')
const TokenGenerator = require('uuid-token-generator')
const nodemailer = require("nodemailer");
var mongoose = require('mongoose');

let domainName = process.env.domainurl || 'localhost' //This will be where we read in the current domain name
let domainPort = process.env.PORT || process.env.ReactClientPort //Read in config setting for our default listen port on our domain

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) throw err
    res.json({
      isLoggedIn: !!user,
      items: user.items,
      user: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      uid: user._id,
      token: jwt.sign({ id: user._id }, process.env.SecretKey)
    })
  })
})

router.post('/users/register', (req, res) => {
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }), req.body.password, err => {
    if (err) throw err
    res.sendStatus(200)
  })
})

router.post('/users/updateAccount', (req, res) => {
  User.findOne({ _id: req.body.uid })
    .then((sanitizedUser) => {
      if (sanitizedUser) {
        sanitizedUser.setPassword(req.body.password, () => {
          sanitizedUser.username = req.body.username
          sanitizedUser.email = req.body.email
          sanitizedUser.firstName = req.body.firstName
          sanitizedUser.lastName = req.body.lastName
          sanitizedUser.save();
          res.sendStatus(200)
        })
      }
    })


})

// Find One user By Email
router.get('/users/email/:email', (req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => {
      res.json(user)
    })
    .catch(e => console.log(e))
})

router.post('/users/userRelationshipFollowing', (req, res) => {
  RelationshipFollowing.findOne({ follower: req.body.follower }, { me: req.body.me }, { relationshipid: req.body.relationshipid})
  .then ((found)=>{

    if (!found)
    {
      RelationshipFollowing.create(req.body)
      .then (
        (newObj)=>
        {
          res.json(newObj)
        }
      )
    }

  })
})


// Find search users base on text and not currently friends
// already or in a relationship
router.post('/users/userSearch', (req, res) => {
  let uid = req.body.uid 

  User.findById(uid)
  .then 
  (currentUser=>
  {

    User.find({ $text: { $search: req.body.searchText } }     )
    .limit(3)
    .then(
      user=>{
         let userFound=[]
        user.forEach(element=>{
          let inFriends = currentUser.friends.includes(element._id)
          let inRelationship = currentUser.relationship.includes(element._id)

          if (element._id != uid && !inFriends && !inRelationship)
           {
           let userObj = {
             id: element._id,
             username: element.username,
             email: element.email,
             firstName: element.firstName,
            lastName: element.lastName
           }
           userFound.push(userObj)
         }
        })
       
        res.json(userFound)
      }
    )
    .catch(e => console.log(e))
  })
})


router.get('/users/userFriends/:id', (req, res) => {
  User.findById(req.params.id)
    .then(
      user => {        

        if (user!==null && user.friends !== null && user.friends.length > 0)
        {
          User.find({ "_id": { $in: user.friends } })
            .then(friends => {
              res.json(friends)
            }
            )
        }
        else
        {
          res.json(null)
        }
        
      }
    )
    .catch(e => console.log(e))

})

router.get('/users/userRelationship/:id', (req, res) => {
  User.findById(req.params.id)
    .then(
      user => {
        //We currently restrict the user to only be in 
        //one relationship at a time but we know in 
        //the real world especially in casual dating
        //that it is possible for a person to be
        //in multiple relationships at a given moment
        if (user !== null && user.relationship !== null && user.relationship.length > 0) {
          let curRelationship = user.relationship[0]
          Relationship.findById(curRelationship)
            .then(relationship => {
              let relationshipObj =
              {
                relationshipID: relationship._id,
                uid: user._id,
                couples: relationship.couples,
                status: relationship.status,
                partnerFirstName: relationship.partnerFirstName,
                partnerLastName:relationship.partnerLastName,
                partnerEmail:relationship.partnerEmail,
                partnerId:relationship.partnerId,
                requestingPartnerId:relationship.requestingPartnerId
              }
              res.json(relationshipObj)
            })
        }
        else {
          res.send(null)
        }
      })
})

router.post('/users/userFriendsDetach', (req, res) => {
  User.findByIdAndUpdate(req.body.requester,
    { $pull: { friends: req.body.recipient } },
    { safe: true, upsert: true },
    (err, doc)=> {
      if (err) {
        console.log(err);
      } else {
        res.send(200)
      }
    }
  );
  
})


router.post('/users/userRelationshipAttach', (req, res) => {
  let couples=[]

  //double check if user is in relationship
  User.findById(req.body.uid)
    .then(user => {
      if (user.relationship === null ||user.relationship.length === 0 )
        {
          couples.push(req.body.id)
          couples.push(req.body.uid)
          let relation = {
            couples: couples,
            partnerFirstName: req.body.firstName,
            partnerLastName: req.body.lastName,
            partnerUserName: req.body.username,
            partnerEmail: req.body.email,
            partnerId: req.body.id,
            requestingPartnerId: req.body.uid,       
            isActive: true,
            status: 2 //in relationship
          }
          Relationship.create(relation)
            .then(relationship => {
              let relationshipId = relationship._id

              User.updateMany(
                { "_id": { "$in": couples } },
                { "$push": { "relationship": relationshipId } },
                ()=>{
                  res.json(relation)                
                }
              )


            })

        }
    })
  
})

router.post('/users/userRelationshipDetach', (req, res) => {
  let couples = []
  couples.push(req.body.id)
  couples.push(req.body.uid)

  let removedRequest = {
    operation:'removeRelationship',
    partnerId:req.body.id,
    requestingPartnerId: req.body.uid,
    relationshipId:req.body.relationshipId
  }

  User.updateMany(
    { "_id": { "$in": couples } },
    { "$pull": { "relationship": req.body.relationshipId } },
    () => {
      Relationship.findOneAndRemove({ _id: req.body.relationshipId }, (err, relationship)=> {
        res.json(removedRequest)
      })
      
    }
  )

})



router.post('/checkToken', (req, res) => {
  let forgetToken = req.body.forgetToken
  ForgotPassword.findOne({ token: forgetToken })
    .sort({ createdDateAt: -1 })
    .then(forget => {

      let userid = forget.user
      User.findOne({ _id: userid })
        .then(user => {

          let userObj

          if (user !== null) {
            userObj =
            {
              uid: user._id,
              username: user.username,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              token: jwt.sign({ id: user._id }, process.env.SecretKey),
              isValidUser: user._id ? true : false
            }
          }
          res.json(userObj)
        })

    })
    .catch((e) => {
      let empty =
      {
        uid: 0,
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        token: '',
        isValidUser: false
      }
      res.json(empty)
    })

})
router.post('/ForgotPasswordToken', (req, res) => {
  let userEmail = req.body.email
  let newTokenGen128 = new TokenGenerator(); //default 128bit
  let newToken = newTokenGen128.generate()
  User.findOne({
    email: userEmail
  })
    .then(user => {
      let userid = user._id

      ForgotPassword.create({ user: userid, token: newToken, email: userEmail })
        .then(forgot => {
          let isHeroku = process.env.isHeroku
          
          let tokenUrlLink = ''

          //in .env if isHeroku=1 it we use Heroku deployment link
          // in .env if is Heroku=0 then we it is our loca
          if (isHeroku==='0') {
            tokenUrlLink = 'http://' + domainName + ':' + domainPort + '/resetAccount/' + newToken
          }
          else {
            tokenUrlLink = 'http://' + domainName + '/resetAccount/' + newToken
          }

          sendForgotPasswordMail(userEmail, tokenUrlLink, user)
        })

    })
    .catch(e => console.log(e))
  res.sendStatus(200)
})



async function sendForgotPasswordMail(email, tokenURL, user) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EmailUser,
      pass: process.env.EmailPassword
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Ratelations Password Reset" <${process.env.EmailAddress}>`, // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    text: `Your username is ${user.username}. Please use the following URL to resetup your password: ${tokenURL}`, // plain text body
    html: `Your username is ${user.username}.  <b>Please use the following URL to resetup your password:</b> ${tokenURL}` // html body
  })
    .catch(e => console.log(e))

}



// GET one user
// router.get('/users/:id', (req, res) => User.findById(req.params.id)
//   .populate('items')
//   .then(user => res.json(user))
//   .catch(e => console.error(e)))

// router.post('/users', (req, res) => User.create(req.body)
//   .then(() => res.sendStatus(200))
//   .catch(e => console.error(e)))

module.exports = router
