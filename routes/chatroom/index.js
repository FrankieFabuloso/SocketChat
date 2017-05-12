const express = require('express')
const router = express.Router()
const {Chatroom} = require('../../database/db.js')

router.get('/', function( req, res) {
  const { chatroom_name } = req.query

  Chatroom.getChatroomIDByName(chatroom_name)
    .then(result => Chatroom.getAllMessages(result.id) )
    .then( messages => { res.send(messages) })
})

module.exports = router
