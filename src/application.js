var loggedUser = null;
var myDB = new DBGears();

$.fn.addError = function(error) {
  $(this).next('error').fadeIn('slow').text(error);
}

$.fn.clearError = function() {
  $(this).next('error').fadeOut('slow', function() {
      $(this).text('');
  });
}

$.fn.hasErrors = function() {
  var has = false;
  $(this).each(function() {
    has = has || ($(this).next('error').text() != '');
  });
  return has;
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

function userFromForm(form) {
  var user = {}
  $('input', form).each(function() {
    var fieldName = $(this).attr('class').split(/\s/)[0];
    if (fieldName != '') {
      user[fieldName] = $(this).val();
    }
  });
  return user;
}

function flash(msg) {
  $('div#flash').text(msg).fadeIn();
  setTimeout(function() {
      $('div#flash').fadeOut('slow', function() {
        $(this).text('');
      });
  }, 3000);
}

$.fn.validateConfirmations = function() {
  var form = this;
  return $('.needs_confirmation', this).blur(function() {
    var password = undefined;
    var fields = $('.needs_confirmation', form);
    var validated = true;
    fields.each(function() {
      if (password == undefined) {
        password = $(this).val();
      } else if (password != $(this).val()) {
        validated = false;
      }
    });
    if (validated) {
      fields.clearError();
    } else {
      fields.addError('A confirmação não bate');
    }
  });
}

function login(user) {
  loggedUser = user;
  $('div#menu a.restricted').fadeIn('slow');
}

$(function(){  
  hideViewsAndShow('login');
  $(':text').focus();
  $('input.login').validateLogin();
  $('input.password').validatePassword();
  $('input.email').validateEmail();
  $('#loginForm').submit(function() {
    var user = userFromForm(this);
    if (myDB.hasUser(user)) {
      login(user);
      flash('Bem-vindo(a), ' + user.login);
    } else {
      flash('Usuário inexistente');
    }
    return false;
  });
  $('#registerForm').submit(function() {
    var user = userFromForm(this);
    var validated = $('.needs_confirmation').hasErrors();
    if (myDB.addUser(user)) {
      login(user);
      flash('Bem-vindo(a), ' + user.login);
    } else {
      flash('Algum erro ocorreu');
    }
    return false;
  }).validateConfirmations();
});

function hideViewsAndShow(viewId) {
  $('div.screen').hide();
  setTimeout(function() {
    $('div#' + viewId).show('slow');
    if (loggedUser == null) {
      $('div#menu a.restricted').fadeOut('slow');
    }
    $('div#menu a.section').hide();
    $('div#menu a.section').each(function() {
      if ($(this).attr('id') != (viewId + 'Link')) {
        $(this).show('slow');
      }
    });
  }, 1000);
}
