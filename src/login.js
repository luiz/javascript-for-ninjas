$.fn.addError = function(error) {
  $(this).next('error').fadeIn('slow').text(error);
}

$.fn.clearError = function() {
  $(this).next('error').fadeOut();
}

$.fn.validateLogin = function() {
  $(this).blur(function() {
    if($(this).val().match(/^\s*$/)) {
      $(this).addError("O campo login não pode ser vazio");
    } else {
      $(this).clearError();
    }
  });
}
  
$.fn.validatePassword = function() {
  $(this).blur(function() {
    if ($(this).val() == '') {
      $(this).addError('O campo senha não pode ser vazio');
    } else {
      $(this).clearError();
    }
  });
}

$.fn.validateEmail = function() {
  $(this).blur(function() {
    if ($(this).val().match(/^.+@.+$/)) {
      $(this).clearError();
    } else {
      $(this).addError('E-mail inválido');
    }
  });
}

$(function(){  
  hideViewsAndShow('login');
  $(':text').focus();
  $('input.login').validateLogin();
  $('input.password').validatePassword();
  $('input.email').validateEmail();
  $('#loginForm').submit(validateAndLoginUser);
  $('#registerForm').submit(validateAndAddUser);
  $('a').validate.teste();
});

function hideViewsAndShow(viewId) {
  $('div.screen').hide(); 
  setTimeout(function() {
    $('div#' + viewId).show('slow');
    $('div#menu a').hide();
    $('div#menu a').each(function() {
      if ($(this).attr('id') != (viewId + 'Link')) {
        $(this).show('slow');
      }
    });
  }, 1000);
}

function validateAndLoginUser() {
}

function validateAndAddUser() {
}
