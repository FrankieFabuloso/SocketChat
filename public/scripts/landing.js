$(document).ready(function(){
  const logInButton = $('.log-in-button')
  const signUpButton = $('.sign-up-button')
  const logInForm = $('.form.form-body--log-in')
  const signUpForm = $('.form.form-body--sign-up')
  const logInFormCancelButton = $('.log-in-cancel-button')
  const signUpFormCancelButton = $('.sign-up-cancel-button')

  logInButton.click( function() {
    $(this).addClass('invisible')
    signUpButton.addClass('invisible')
    logInForm.removeClass('invisible')
  })

  signUpButton.click( function() {
    $(this).addClass('invisible')
    logInButton.addClass('invisible')
    signUpForm.removeClass('invisible')
  })

  logInFormCancelButton.click( function() {
    logInForm.addClass('invisible')
    logInButton.removeClass('invisible')
    signUpButton.removeClass('invisible')
  })

  signUpFormCancelButton.click( function() {
    signUpForm.addClass('invisible')
    logInButton.removeClass('invisible')
    signUpButton.removeClass('invisible')
  })
})
