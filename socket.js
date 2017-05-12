
module.exports = ( server ) => {
  const io = require('socket.io')(server)

  // ~ ~ ~ ~ Socket.io things ~ ~ ~ ~
  io.on('connection', function(client) {
    console.log('client connetced...')

    client.on('join', function(data) {
      client.emit('messages', "Hello, from the sever...")
    })

    client.on('messages', function(data, req) {
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
}
