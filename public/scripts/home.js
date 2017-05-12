const updateChatroomName = chatroomName => {
  $("span.current-conversation").text(chatroomName)
  $(".conversation-content").effect('bounce', 'slow')
}

const loadAndPositionStartView = () => {
  const chatroomContent = $( '.chatroom-content' )
  chatroomContent.scrollTop( chatroomContent.prop("scrollHeight") )
}

const loadSelectedChatRoom = (event) => {
  const clickedChatroom = $(event.target)
  const chatroomName = clickedChatroom.text()
  //change chatroom name in view
  updateChatroomName(chatroomName)

  $.ajax({
    url: "http://localhost:3000/chatroom",
    data: { chatroom_name: chatroomName }
  }).done( populateChatroom )
}

const clearConversationContent = () => {
  $('.chatroom-content').empty()
}

const populateChatroom = ( messages ) => {
  const chatroomContent = $('.chatroom-content')
  const user_id = $('.home').attr('data')

  clearConversationContent()

  messages.forEach( (message) => {
    if(message.client_id == user_id) {
      chatroomContent
        .append( $("<div>")
          .addClass('message-text mine')
          .text(message.message_body) )
    } else {
      chatroomContent
        .append( $("<div>")
            .addClass('message-text theirs')
            .text(message.message_body) )
    }
  })
  loadAndPositionStartView()
}




// - - - - - DOM READY - - - - -
$(document).ready(function() {
  const user_id = $('.home').attr('data')

  loadAndPositionStartView()

  $('.chatroom-name').on('click', loadSelectedChatRoom)
// socket stuff
  var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('postMessage', function(data) {
      const chatroomContent = $('.chatroom-content')
      const newMessageTextDiv = $("<div>")

      if( data.user_id === user_id ) {
        newMessageTextDiv.addClass("message-text mine").text(data.newMessage)
      } else {
        newMessageTextDiv.addClass("message-text theirs").text(data.newMessage)
      }

      chatroomContent.append(newMessageTextDiv)
      chatroomContent.scrollTop( chatroomContent.prop("scrollHeight") )
    })

  $('#newMessage').keypress(function(event){
    const newMessage = $(this).val()
    const currentChatroom = $('.current-conversation').text()

    if (event.keyCode == 13  && !event.shiftKey ){
      event.preventDefault()
      $(this).val('')
      socket.emit('messages', { newMessage, currentChatroom, user_id } )
    }
  })
})
