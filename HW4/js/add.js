/* Page transitions */
/*$(window).load(function() { 
        $(document.body).animate({opacity: 1}, 750); 
        });
  
        $('#save').click(function pageTransition(){ 
            $(document.body).animate({opacity: 0}, 750, function(){window.location.href='list.html'}); 
        }); 
  
        function selectImage(name) {
          //Clear all the other effects
          document.getElementById('icon1').style.border = "none";
          document.getElementById('icon2').style.border = "none";
          document.getElementById('icon3').style.border = "none";
          var image = document.getElementById(name);
          image.style.border = "5px solid #42A5F5";
        }*/
  
  function toggleReminder(){
  	$(".hide").toggleClass("reminderDivShow");
  	$(".fa-chevron-right").toggleClass("fa-chevron-down");
  }
  
  
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


