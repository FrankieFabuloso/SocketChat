$(document).ready(function(){
  $('#log_in_button').click( function() {
    $(this).addClass('invisible')
    $('#sign_up_button').addClass('invisible')
    $('.form.form-body--log-in').removeClass('invisible')
  })

  $('#sign_up_button').click( function() {
    $(this).addClass('invisible')
    $('#log_in_button').addClass('invisible')
    $('.form.form-body--sign-up').removeClass('invisible')
  })

  $('#log_in_cancel_button').click( function() {
    $('.form.form-body--log-in').addClass('invisible')
    $('#log_in_button').removeClass('invisible')
    $('#sign_up_button').removeClass('invisible')
  })

  $('#sign_up_cancel_button').click( function() {
    $('.form.form-body--sign-up').addClass('invisible')
    $('#log_in_button').removeClass('invisible')
    $('#sign_up_button').removeClass('invisible')
  })
})
