var button = $('.signUpButton');

button.one('click', function onClickSignUp() {
  var signUpText = document.getElementById("signInMessage");

  var buttons = document.getElementsByClassName('buttons')[0]; 
  buttons.style.position = 'relative'; 
  $(buttons).animate({top: '65px'}, 'slow', function(){
  	  signUpText.style.display = "block";
  	  buttons.style.top = 0; 
  }); 
}); 
