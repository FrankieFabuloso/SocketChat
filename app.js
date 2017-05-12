const express = require('express')
const cookieParser = require( 'cookie-parser' )
const cookieSession = require( 'cookie-session')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const favicon = require('serve-favicon');
const bodyParser = require('body-parser')
const path = require('path')
const SHA256 = require('crypto-js/sha256')
const {User, Chatroom} = require('./database/db.js')

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static( path.join(__dirname, 'public') ));

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use( cookieParser('F4@RT$') )
app.use( cookieSession({
  key: 'app.sess',
  secret: 'SUPERsekret'
}) )


// --- ROUTES ----
const render = require('./routes/render')
const chatroom = require('./routes/chatroom')
const user = require('./routes/user')

app.use( '/', render )
app.use( '/chatroom', chatroom )
app.use( '/user', user )

//  add render middleware from routes/render
server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// ~ ~ ~ ~ Socket.io things ~ ~ ~ ~
io.on('connection', client => {
  console.log('client connetced...')

  client.on('join', data =>  {
    client.emit('messages', "Hello, from the sever...")
  })

  client.on('messages', (data, req) => {
    const { currentChatroom, newMessage, user_id } = data

    Chatroom.getChatroomIDByName(currentChatroom)
    .then(chatroom =>
      User.sendMessage(chatroom.id, user_id, newMessage)
      .then(_ => {
        io.emit('postMessage', data)
      })
    )
  })
})
