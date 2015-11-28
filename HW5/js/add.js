function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}
function addHabit(){
 	
}
function loginSuccess() {
    FB.api('/me', function(response) {
      var ref = new Firebase('https://burning-heat-9490.firebaseio.com/');
      ref.on("value", function(snapshot) {
         var user_key = _.findKey(snapshot.val().Facebook,function(d){return d.user_id == response.id});
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
      }
      //add new habit to Firebase
      var ref = new Firebase('https://burning-heat-9490.firebaseio.com/');
          //on save, send data into firebase
          $('#save').click(function createHabit(){
            console.log(window.user_key);
            //weekly frequency
            var weeklyFreqArray = [];
                var weekdays = document.getElementsByClassName('days'); 

                for (var i = 0; i < weekdays.length; i++){
                       if (weekdays[i].checked){
                              weeklyFreqArray.push(Number(weekdays[i].value));
                       }
                }
                     
                // Title
                var title = $('#title').val();       
            var newHabit = ref.child('Facebook').child(user_key).child("Habits");

            // Daily Frequency 
            var dailyoption = document.getElementById('dailyOptions'); 
            var options = dailyoption.children; 

            for (var i = 0; i < options.length; i++){
              if (options[i].selected){
                var daily = Number(options[i].value); 
              }
            }

            //Reminders: Time Interval 
            var reminders = document.getElementById('alertOptions'); 
            var reminderOptions = reminders.children; 

            for (var i = 0; i < reminderOptions.length; i++){
              if (reminderOptions[i].selected){
                var interval = Number(reminderOptions[i].value); 
              }
            }

            //Reminders: Start time and finish time 
            var hours = document.getElementsByClassName('timepicker'); 
            var start = hours[0].value; 
            var end = hours[1].value; 

            newHabit.push({title:title, daily_frequency:daily, weekly_frequency:weeklyFreqArray, time_interval:interval, from: start, to: end});
          });
      }, function (errorObject) {
         window.user_key = null;
      });
    });
}

function loginFailure(){
  window.location.href = "../src/login.html";
}

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

        } */


