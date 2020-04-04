const router = require('express').Router()
const { User, ForgotPassword } = require('../models')
const jwt = require('jsonwebtoken')
const TokenGenerator = require('uuid-token-generator')
const nodemailer = require("nodemailer");
let domainName = process.env.domainurl || 'localhost' //This will be where we read in the current domain name
let domainPort = process.env.PORT || 3001 //Read in config setting for our default listen port on our domain

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) throw err
    res.json({
      isLoggedIn: !!user,
      items: user.items,
      user: user.username,
      uid: user._id,
      token: jwt.sign({ id: user._id }, process.env.SecretKey)
    })
  })
})

router.post('/users/register', (req, res) => {
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
    firstName:req.body.firstName,
    lastName:req.body.lastName
  }), req.body.password, err => {
    if (err) throw err
    res.sendStatus(200)
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
         let tokenUrlLink = 'http://' + domainName + ':' + domainPort + '/api/forgotPasswordReset/' + newToken
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


//Render Reset Password View
router.get('/forgetPasswordReset/:token', (req, res) => {
  let token = req.params.token
  let found = ForgotPassword.findOne({
    token: token
  }).sort({ '_id': -1 })
    .then(forgotPassword => {

      res.render('forgetpassword-reset', {
        userid: forgotPassword.userid,
        token: token
      })
    })
})


// GET one user
router.get('/users/:id', (req, res) => User.findById(req.params.id)
  .populate('items')
  .then(user => res.json(user))
  .catch(e => console.error(e)))

// router.post('/users', (req, res) => User.create(req.body)
//   .then(() => res.sendStatus(200))
//   .catch(e => console.error(e)))

module.exports = router
