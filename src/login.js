$(function(){  
  $('div#login').show();
  var login = $('input#username');
  var password = $('input#password');
  login.focus();
  validate.login(login);
  validate.password(password);
});

var viewsId = []
viewsId[0] = 'login';
viewsId[1] = 'register';

function hideViewsFor(view){
  $(viewsId).each(function(c,e){
    if(e != view){
      $('div#'+e).hide();
    }
  });
}

var validate = {
  login : function( loginName ){
     $(loginName).blur(function(){
      if(loginName.val() != 'secret'){
        loginName.next('error').html('');
        if(loginName.val() == ''){
          loginName.next('error').fadeIn('slow').text('O campo login não pode ser vazio');
        }else{
          loginName.next('error').fadeIn('slow').text('Usuario não existe');
        }
      }else{
        loginName.next('error').fadeOut();
      }
    });
  },
  
  password: function(passwordText){
    $(passwordText).blur(function(){
      if( passwordText.val() == '' ){
        passwordText.next('error').fadeIn('slow').text('O campo senha não pode ser vazio');
      }else{
        passwordText.next('error').fadeOut();
      }
    });
  }, 
}

function buildRegisterView(){
  hideViewsFor('register');
  setTimeout(function() {
    $('div#register').show('slow');
    $('a#registerNewUser').hide();
    $('a#linkToLogin').show('slow');
  }, 1000);
}

function buildLoginView(){
  hideViewsFor('login');
  setTimeout(function() {
    $('div#login').show('slow');
    $('a#linkToLogin').hide('slow');
    $('a#registerNewUser').show();
  }, 1000);
}
