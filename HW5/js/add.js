function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}
function getIcon(e){
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
    ref.on("value", function(snapshot) {

      $('#save').click(function pageTransition(){ 
        $(document.body).animate({opacity: 0}, 750, function(){window.location.href='list.html'}); 
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
          console.log(selected_icon);
          newHabit.push({title:title, icon_id : selected_icon.id, icon_src: selected_icon.src, daily_frequency:daily, weekly_frequency:weeklyFreqArray, time_interval:interval, from: start, to: end});
        });
      }, function (errorObject) {
      });
  } else {
    console.log("User is logged out");
    window.location.href = "../src/login.html";
  }
}
