// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    	loginSuccess();
  } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      loginFailure(); 
  } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      loginFailure();
  }
}

  function checkLoginState() {
  	FB.getLoginStatus(function(response) {
  		statusChangeCallback(response);
  	});
  }

  window.fbAsyncInit = function() {
  	FB.init({
  		appId      : '1504476269879952',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use version 2.2
});

  FB.getLoginStatus(function(response) {
  	statusChangeCallback(response);
  });

};
  // Load the SDK asynchronously
  (function(d, s, id) {
  	var js, fjs = d.getElementsByTagName(s)[0];
  	if (d.getElementById(id)) return;
  	js = d.createElement(s); js.id = id;
  	js.src = "//connect.facebook.net/en_US/sdk.js";
  	fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));