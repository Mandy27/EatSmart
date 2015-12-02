var messageShown = false; 

/*******************Custom Login ******************/
$('.signUpButton').on('click', function onClickSignUp() {
	// Identify the user w/ a specific ID 
	var signUpText = document.getElementById("signInMessage");
	var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
	ref.createUser({
	  email    : $("#usermail")[0].value,
	  password : $("#password")[0].value
	}, function(error, userData) {
	  if (error) {
	  	mixpanel.track("User failed to log in"); 
	    signUpText.innerHTML = error+"<span style='color: red'>&#10005;</span>";
	  } else {
	  	mixpanel.track("User successfully logged in"); 
	    signUpText.innerHTML = "Sign up successful! <span style='color: #4caf50'>&#10004;</span><br> Please Sign In !!!";
	    $("#usermail")[0].value = "";
	    $("#password")[0].value = "";
	  }
	});
	if (!messageShown){
		var buttons = document.getElementsByClassName('buttons')[0]; 
		buttons.style.position = 'relative'; 
		$(buttons).animate({top: '65px'}, 'slow', function(){
			signUpText.style.display = "block";
			buttons.style.top = 0; 
			messageShown = true; 
		});
	}
}); 

$(window).load(function() { 
	$(document.body).animate({opacity: 1}, 750); 
});

$('.loginButton').on('click',function onClickLogin(){ 
	var signUpText = document.getElementById("signInMessage");
	var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
	ref.authWithPassword({
	  email    : $("#usermail")[0].value,
	  password : $("#password")[0].value
	}, function(error, authData) {
		if (error) {
			mixpanel.track("User failed to sign in"); 
		    signUpText.innerHTML = error+"<span style='color: red'>&#10005;</span>";
		} else {
			signUpText.innerHTML = "Sign in successful! <span style='color: #4caf50'>&#10004";
			mixpanel.track("User successfully signed in"); 
			ref = ref.child('Custom').child(authData.uid);
			
			mixpanel.identify($("#usermail")[0].value);

			mixpanel.people.set_once({
		    	"$email": $("#usermail")[0].value
		    });  

		    mixpanel.people.set({
		    	"$last_login": new Date()
		    });

			ref.on("value", function(snapshot) {
				if(snapshot.val() != null || snapshot.val() != undefined){
					$(document.body).animate({opacity: 0}, 750, function(){window.location.href='list.html'});
				}
				else{
					$(document.body).animate({opacity: 0}, 750, function(){window.location.href='welcome.html'});
				}
			}, function (errorObject) {
			});
		}
	});
	if (!messageShown){
		var buttons = document.getElementsByClassName('buttons')[0]; 
		buttons.style.position = 'relative'; 
		$(buttons).animate({top: '65px'}, 'slow', function(){
			signUpText.style.display = "block";
			buttons.style.top = 0; 
			messageShown = true; 
		}); 
	}
}); 