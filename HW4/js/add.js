function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}

<<<<<<< HEAD
//when "save it" is clicked
function addHabit(){
	//return an error when habit title is not correctly filled out
	var x = document.forms["myForm"]["habit"].value;
		if (x == "" | x == null  ){
			alert("Habit must be added!");
			return false; 
		}

	//add the habit to the list	(Firebase?)
}

//navigate to the list (Firebase?)
function habitIconClick(){
}


=======
// function alldayCheckbox(){
// 	if ($('#allday').prop('checked')) {
// 		var temp = $('.timepicker');
// 		for(var i = 0; i < temp.length; i++){
// 			$('.timepicker')[i].readOnly = true;
// 		}
// 		$('.text-format').addClass('hideTimepicker');
// 	}
// 	else {
// 		var temp = $('.timepicker');
// 		for(var i = 0; i < temp.length; i++){
// 			$('.timepicker')[i].readOnly = false;
// 		}
// 		$('.text-format').removeClass('hideTimepicker');
// 	}
// }
function addHabit(){
 	Notification.requestPermission();
  	var theBody = "Hi";
  	var theIcon = "../img/logo.png";
  	var theTitle = "Notification";
  	spawnNotification(theBody,theIcon,theTitle);
  	function spawnNotification(theBody,theIcon,theTitle) {
  		var options = {
  			body: theBody,
  			icon: theIcon
  		}
	  	var n = new Notification(theTitle,options);
	  	setTimeout(n.close.bind(n), 3000); 
	}
}
>>>>>>> ec714d4fec1fecd8305a41f8b5f9fb9669bc1cc9
