function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}
function getIcon(e){
  console.log(e);
  var icon_holder = document.getElementById('iconHolder');
  var filename =e.timeStamp;
  var icon = document.createElement('img');
  icon.src = e.fpfile.url;
  icon.alt = filename;
  icon.className = "icon";
  icon.id = filename;
  icon.dataSelected = false;
  icon.addEventListener("click",function(){
    selectImage(filename);
  });
  icon_holder.appendChild(icon);
  selectImage(filename); // Default select the icon you just uploaded
}
function selectImage(name) {
  $('#iconHolder img').attr('style','border:none');
  $('#'+name).attr('style','border:5px solid #42A5F5');
  selected_icon.id = name;
  selected_icon.src = $('#'+name).attr('src');
}
var selected_icon = {id: "default", src: "../img/No_image_available.jpg"};
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

        var icon_holder = document.getElementById('iconHolder');
        var icon = document.createElement('img');
        icon.src = data.icon_src;
        icon.alt = "habit icon";
        icon.className = "icon";
        icon.id = data.icon_id;
        icon.addEventListener("click",function(){
          selectImage(data.icon_id);
        });
        icon.style.border = '5px solid #42A5F5';
        icon_holder.appendChild(icon);
        selected_icon.id = data.icon_id;
        selected_icon.src = $('#'+data.icon_id).attr('src');


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

      newHabit.child(key).set({title:title, icon_id : selected_icon.id, icon_src: selected_icon.src, daily_frequency:daily, weekly_frequency:weeklyFreqArray, time_interval:interval, from: start, to: end});
      mixpanel.track("User edited a habit"); 
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


