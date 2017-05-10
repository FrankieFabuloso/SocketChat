const express = require('express')
const app = express()
const router = express.Router()
const {User} = require('../../../database/db.js')
const crypto = require('crypto')
const SHA256 = require("crypto-js/sha256");

const encryptPasswordWithSalt = ( password, salt ) => {
  salt = salt || crypto.randomBytes(16).toString('hex')
  const saltedPassword = password + salt
  const cryptoPassword = SHA256(saltedPassword).toString()
  return {salt, cryptoPassword}
}

const checkValidLogin = ( foundSalt, foundPassword, enteredPassword ) => {
  const {cryptoPassword} = encryptPasswordWithSalt( enteredPassword, foundSalt )

  return cryptoPassword === foundPassword
}

// - - - - ROUTES - - - -
router.post('/sign-up', function( req, res, next ) {
  const { email, username, password } = req.body
  const { salt, cryptoPassword } = encryptPasswordWithSalt( password[0] )

  User.signUp([ email, username, cryptoPassword, salt ])
    .then( newUser => {
      req.session.user_id = newUser.id
      req.session.username = newUser.username
      req.session.password = newUser.password
      res.cookie('user_id', newUser.id, { maxAge: 900000, httpOnly: false });
      res.redirect('/home')
    })

} )

router.post('/login', function( req, res, next ) {
  const { email, username, password } = req.body

  User.findByUsername( username )
    .then( foundUser => {
      if( checkValidLogin(foundUser.salt, foundUser.password, password ) ){
        req.session.user_id = foundUser.id
        req.session.username = foundUser.username
        req.session.password = foundUser.password
        res.cookie('user_id', foundUser.id, { maxAge: 900000, httpOnly: false });
        res.redirect('/home')
      } else {
        res.render('landing', { error: 'Password you entered is incorrect!' })
      }
    })
    .catch( error => res.render('landing', {error}))
})

router.get('/logout', function( req, res ) {
  res.send('logging out')
})

module.exports = router
