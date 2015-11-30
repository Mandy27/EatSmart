function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
//ref.unauth();
ref.onAuth(authDataCallback);
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    var key = window.location.href;
    key = key.substring(key.indexOf("?") + 1);      // Get id of the habit needed edit
    ref.on("value", function(snap) {
      var dataRef = ref.child('Custom').child(authData.uid);
      dataRef.on("value", function(snapshot) {
        var data = snapshot.val().Habits[key];
        $("#title")[0].value = data.title;
        var weekdays = document.getElementsByClassName('days');
        _.each(weekdays,function(d){
          if(_.indexOf(data.weekly_frequency,Number(d.value)) != -1){
            d.checked = true;
          }
          else{
            d.checked = false;
          }
        });
        _.each($("#dailyOptions")[0], function(d){
          if(Number(d.value) == data.daily_frequency){
            d.selected = true;
          }
        });
        _.each($("#alertOptions")[0], function(d){
          if(Number(d.value) == data.time_interval){
            d.selected = true;
          }
        });
        var timepicker = document.getElementsByClassName('timepicker');
        timepicker[0].value = data.from;
        timepicker[1].value = data.to;

      }, function (errorObject) {
      });
    }, function (errorObject) {
    });
    //on save, send data into firebase
    $('#save').click(function createHabit(){
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
      var newHabit = ref.child('Custom').child(authData.uid).child("Habits");
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

      newHabit.child(key).set({title:title, daily_frequency:daily, weekly_frequency:weeklyFreqArray, time_interval:interval, from: start, to: end});
    });
  } else {
    console.log("User is logged out");
    window.location.href = "../src/login.html";
  }
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


