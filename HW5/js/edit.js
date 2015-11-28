function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}
function loginSuccess() {
  FB.api('/me', function(response) {
    var ref = new Firebase('https://burning-heat-9490.firebaseio.com/');
    ref.on("value", function(snap) {
      window.user_key = _.findKey(snap.val().Facebook,function(d){return d.user_id == response.id});
      var key = window.location.href;
      key = key.substring(key.indexOf("?") + 1);      // Get id of the habit needed edit
      var dataRef = ref.child('Facebook').child(window.user_key);
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


