function loginSuccess() {
    FB.api('/me', function(response) {
      
    });
}

function loginFailure(){
  window.location.href = "../src/login.html";
}