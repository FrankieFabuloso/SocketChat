$(document).ready(function(){
  $('#log_in_button').click( function() {
    $(this).addClass('invisible')
    $('.form.form-body--log-in').removeClass('invisible')
  })

  $('#landing_cancel_button').click( function() {
    $('.form.form-body--log-in').addClass('invisible')
    $('#log_in_button').removeClass('invisible')
  })
})
