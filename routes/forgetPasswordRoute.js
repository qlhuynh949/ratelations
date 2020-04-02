const router = require('express').Router()
const { ForgetPassword } = require('../models')
const TokenGenerator = require('uuid-token-generator')
const nodemailer = require("nodemailer");
let domainName = process.env.domainurl || 'localhost' //This will be where we read in the current domain name

let domainPort = process.env.PORT || 3001 //Read in config setting for our default listen port on our domain


// Find One user By Email
router.get('/users/email/:email', (req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => {
      res.json(user)
    })
    .catch(e => console.log(e))
})

router.post('/ForgetPasswordToken', (req, res) => {
  let userEmail = req.body.forgetPasswordEmail
  let newTokenGen128 = new TokenGenerator(); //default 128bit
  let newToken = newTokenGen128.generate()
  User.findOne({
      email: userEmail
  })
    .then(user => {

      let userid = user._id

      //res.end(userid)
      ForgotPassword.create({ userid: userid, token: newToken, email: userEmail })
        .then(forgot => {
          let tokenUrlLink = 'http://' + domainName + ':' + domainPort + '/api/forgetPasswordReset/' + newToken
          sendForgotPasswordMail(userEmail, tokenUrlLink, user)
        })

    })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(e => console.log(e))
  res.sendStatus(200)
})

//Render Reset Password View
router.get('/forgetPasswordReset/:token', (req, res) => {
  let token = req.params.token
  let found = ForgotPassword.findOne({
      token: token
    }).sort({'_id','desc'}) 
    .then(forgotPassword => {

      res.render('forgetpassword-reset', {
        userid: forgotPassword.userid,
        token: token
      })
    })
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
