const updateChatroomName = (chatroom_name) => {
  $("span.current_convorsation").text(chatroom_name)
  $(".converstaion_content").effect('bounce', 'slow')
}

const loadAndPositionStartView = () => {
  $('.coversation_content').scrollTop($('.coversation_content')[0].scrollHeight)
}

const loadSelectedChatRoom = (event) => {
  let myThis = event.target
  const chatroom_name = $(myThis).text()
  //change chatroom name in view
  updateChatroomName(chatroom_name)
  $.ajax({
    url: "http://localhost:3000/home/chatroom",
    data: { chatroom_name }
  }).done(function(results){
    populateChatroom( results )
  })
}

const clearConversationContent = () => {
  $('.coversation_content').empty()
}

const populateChatroom = ( messages ) => {
  clearConversationContent()
  for( let message of messages) {
    let messageDiv = $("<div>")
    if(message.client_id == 1) {
      messageDiv.addClass('message_text mine').text(message.message_body)
    } else {
      messageDiv.addClass('message_text theirs').text(message.message_body)
    }
    $('.coversation_content').append(messageDiv)
  }
}

$(document).ready(function() {
  loadAndPositionStartView()

  $('.coversation').on('click', loadSelectedChatRoom)

// socket stuff
  var socket = io.connect('http://localhost:3000');
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('board', function(data){

      let { newMessage } = data
      let newMessageTextDiv = $("<div>").addClass("message_text mine").text(newMessage)
      $('.coversation_content').append(newMessageTextDiv)
      $('.coversation_content').scrollTop = $('.coversation_content').scrollHeight
      $('.coversation_content').scrollTop($('.coversation_content')[0].scrollHeight)
    })

    socket.on('messages', function(data){
    })


  $('#newMessage').keypress(function(e){
    if (e.keyCode == 13  && !e.shiftKey ){
      e.preventDefault()

      let newMessage = $(this).val()
      $(this).val('')
      let currentChatroom = $('.current_convorsation').text()
      socket.emit('messages', {newMessage, currentChatroom} )
    }
  })
})
