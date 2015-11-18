$('.signUpButton').one('click', function onClickSignUp() {
  var signUpText = document.getElementById("signInMessage");

  var buttons = document.getElementsByClassName('buttons')[0]; 
  buttons.style.position = 'relative'; 
  $(buttons).animate({top: '65px'}, 'slow', function(){
  	  signUpText.style.display = "block";
  	  buttons.style.top = 0; 
  }); 
}); 

$(window).load(function() { 
    $(document.body).animate({opacity: 1}, 750); 
});

$('.loginButton').click(function pageTransition(){ 
    $(document.body).animate({opacity: 0}, 750, function(){window.location.href='welcome.html'}); 
}); 
