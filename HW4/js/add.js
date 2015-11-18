function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}

<<<<<<< HEAD

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
