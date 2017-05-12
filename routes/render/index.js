const express = require('express')
const router = express.Router()
const {User, Chatroom} = require('../../database/db.js')

router.get('/', function (req, res) {
  res.render('landing', {title: 'Messager'})
})

router.get('/home', function (req, res) {
  const { user_id } = req.session
  
  Promise.all([User.getAllChats(user_id), Chatroom.getAllMessages(user_id)])
  .then(results => {
    res.render('home', {
      user_chat_rooms: results[0],
      chat_room_messages: results[1],
      user_id
    })
  })
})

module.exports = router
