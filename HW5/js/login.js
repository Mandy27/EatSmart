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

function loginSuccess() {
  	FB.api('/me', function(response) {
  		var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
  		var authorization;
  		var habitList;
  		ref.on("value", function(snapshot) {
  			var accounts = _.toArray(snapshot.val().Facebook);
	   		authorization = (_.findIndex(accounts,'user_id',response.id));
	   		if(authorization == -1){
	  			var newUser = ref.child('Facebook');
	    	    newUser.push({user_id: response.id, user_name: response.name});
	    	    window.location.href = "../src/welcome.html";
	  		}
	  		else{
	  			habitList = accounts[authorization].Habits;
	  			if(habitList == null || habitList == undefined){
	  				window.location.href = "../src/welcome.html";
	  			}
	  			else{
	  				window.location.href = "../src/list.html";
	  			}
	  		}
		    
		}, function (errorObject) {
	   		authorization = -1;
		});
  	});
  }

function loginFailure(){
}