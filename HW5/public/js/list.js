function displayHabits (name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(title+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function updateProgress(element, int) {
    /*
    var msgElement = (element.parentNode.parentNode.getElementsByClassName("message-today"))[0];
    $(msgElement).animate({opacity: 1}, 300); 
*/
    int++;

    //keep track of clicks 
    var incrementProgress = new Firebase('https://burning-heat-9490.firebaseio.com/');
    var ref = new Firebase('https://burning-heat-9490.firebaseio.com/Custom');
    var clicks = 0; 

    //creates a new, incremental record
    $('body').on('click', '#increment', function incrementId(e){
        mixpanel.track("User updated progress of habit"); 
        Rollbar.debug('click'); 
        clicks++; 
        Rollbar.debug('clicks before' + clicks); 

        ref.onAuth(function(authData) {
            added = true;
            if (authData) {
                Rollbar.debug("User " + authData.uid + " is logged in with " + authData.provider);

                ref.on("value", function(snap) {
                  var dayHabit = ref.child(authData.uid).child('Habits').child(element.value).child('dailycounter'); 
                  var dailyfreq = snap.child(authData.uid).child('Habits').child(element.value).val()['daily_frequency']; 
                  var record = snap.child(authData.uid).child('Habits').child(element.value).val()['daycounter']; 

                  dayHabit.transaction(function(currentDailyProgress){ 
                    if (currentDailyProgress < dailyfreq && clicks > 0){
                        /* Change the text on the page */
                        var text = element.parentElement.parentElement.getElementsByClassName('message-today')[0].getElementsByTagName('strong')[0]; 
                        var newDailyProgress = currentDailyProgress + 1; 
                        Rollbar.debug(newDailyProgress); 
                        text.innerHTML = newDailyProgress + '/' + dailyfreq; 
                        clicks--; 
                        Rollbar.debug('clicks after' + clicks); 
                        
                        //Progress bar animation 
                        var progress = element.parentNode.parentNode.getElementsByClassName('progress');
                        var oldx2 = progress[0].getAttribute('x2'); 

                        var bar = element.parentNode.parentNode.getElementsByClassName('bar');
                        var oldx1 = bar[0].getAttribute('x1'); 

                        var portion = 150/dailyfreq; 

                        // Animates from current location on the bar 
                        $({x2:oldx2}).animate(
                            {x2: (Number(oldx2) + portion) + 'px'},
                            {
                                duration:200,
                                step:function(now){$(progress).attr('x2', now);
                                queue: false; 
                            }
                        });

                        $({x1:oldx1}).animate(
                            {x1: (Number(oldx1) + portion) + 'px'},
                            {
                                duration:200,
                                step:function(now){$(bar).attr('x1', now);
                                queue: false; 
                            }
                        });

                        // If user met quota for today 
                        if (newDailyProgress == dailyfreq){
                            var dayCount = ref.child(authData.uid).child('Habits').child(element.value).child('daycounter'); 
                            var dayCountVal = snap.child(authData.uid).child('Habits').child(element.value).val()['daycounter'];
                            var record = ref.child(authData.uid).child('Habits').child(element.value).child('record'); 
                            var recordVal = snap.child(authData.uid).child('Habits').child(element.value).val()['record'];

                            var daycounterText = element.parentElement.parentElement.getElementsByClassName('message-total')[0].getElementsByTagName('strong')[0]; 
                            dayCountVal++;  
                            daycounterText.innerHTML = dayCountVal; 
                            dayCount.transaction(function(currentDayCount){
                                return currentDayCount + 1; 
                            }); 
                            // If user broke a record 
                            if (dayCountVal > recordVal){
                                var recordText = element.parentElement.parentElement.getElementsByClassName('message-total')[0].getElementsByTagName('strong')[1]; 
                                recordVal++; 
                                recordText.innerHTML = recordVal; 
                                record.transaction(function(currentRecord){
                                    return currentRecord + 1; 
                                });
                            }
                        }

                        return newDailyProgress; 
                    }
                  }, function (err){

                  }); 
                e.stopImmediatePropagation();
                }); 
            }
        });
    /*
        var errorId = 0;

        //increment the counter
        incrementProgress.child('counter').transaction(function(currentValue){
            return (currentValue || 0) + 1
        }, function(err, committed, ss){
            if(err){
                setError(err);
            }
            
            else if(committed){
                //if update succeeds, then create a record
                addRecord(ss.val());
            }
        });

        //create new incremental record
        function addRecord(id) {
            setTimeout(function() {
                incrementProgress.child('records').child('rec'+id).set('record #'+id, function(err) {
                    err && setError(err);
                });        
            });
        }
        */

    });
}

/* Transition animations when a habit is deleted */
function deleteHabit(element) {
    var ref = new Firebase('https://burning-heat-9490.firebaseio.com/Custom');
    ref.onAuth(function(authData){
        ref = ref.child(authData.uid);
        var habit = ref.child('Habits');
        var flag = confirm("Are you sure you want to delete the habit?");
        if(flag === true){
            mixpanel.track("User deleted habit"); 
            mixpanel.people.increment("numHabits", -1); 

            added = true; 

            habit.child(element.value).remove();

            var child = element.parentNode.parentNode;
            var parent = child.parentNode;

             ///Slides up to delete 
             $(child).closest('li').slideUp('slow', function(){
                 $(child).remove(); 
             });

            habit.on("value", function(snapshot) {
                if(snapshot.exists() == false){
                    window.location.href = "../src/welcome.html";
                }
            });
        }
    });
}

// keep track of habit progress 
/*
var errorId = 0;
function incrementId(){
    var incrementProgress = new Firebase('https://burning-heat-9490.firebaseio.com/');
    //increment the counter
    incrementProgress.child('progressCounter').transaction(function(currentValue){
        return (currentValue || 0) + 1
    });
}   
*/

/*function(err, committed, ss){
             if(err){
                 setError(err);
             }
             else if(committed){
                 //if update succeeds, then create a record
                 addRecord(ss.val());
             }
         });
     }

 //create new incremental record
 function addRecord(id) {
     setTimeout(function() {
         incrementProgress.child('records').child('rec'+id).set('record #'+id, function(err) {
             err && setError(err);
         });        
     });
 }*/

/* Transition animations on navigating to the edit page */
function editPageTransition(id){
    var habitList = document.getElementById('habit-list').children;
    var delay = 0; 

    for (var i = 0; i < habitList.length; i++){
        
        //Slides to the left of the screen to delete 
        habitList[i].style.position = 'relative'; 
        
        if (i != habitList.length - 1){
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500); 
            delay+=100; 
        }
        
        else{
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500, function(){window.location.href='edit.html?'+id}); 
        }
    }
}

/* Transition animations on navigating to the add page */
function addPageTransition(){
    var habitList = document.getElementById('habit-list').children;
    var delay = 0; 

    for (var i = 0; i < habitList.length; i++){
        if (i != habitList.length - 1){
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500); 
            delay+=100; 
        }
        
        else{
            $(habitList[i]).delay(delay).animate({right: '1500px'}, 500, function(){window.location.href='add.html'}); 
        }
    }

    if (habitList.length == 0){
        window.location.href='add.html'; 
    }

}

var added = false; // Keeps track of whether children were previously added 

/***********************Authentication*************************/
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
//ref.unauth();
ref.onAuth(authDataCallback);
function authDataCallback(authData) {
  if (authData) {
    Rollbar.debug("User " + authData.uid + " is logged in with " + authData.provider);
    var dataRef = ref.child('Custom');
    dataRef.on("value", function(snapshot) {
        var habitList = $('#habit-list');
        var ref = dataRef.child(authData.uid).child('Habits');
        ref.on("value", function(snap) {
            if(snap.exists() == false){
                window.location.href = "../src/welcome.html";
            }
        });
        /* Fetch habit list data */
        var childAdd = ref.on('child_added', function (snapshot) {
            var delay = 0; 

            // get data
            var data = snapshot.val();
            var title = data.title;
            var dailyfrequency = data.daily_frequency;
            var dailycounter = data.dailycounter;
            var daycounter = data.daycounter;
            var record = data.record;
            var icon_src = data.icon_src;
            var icon_id = data.icon_id;

            var portion = 150/dailyfrequency * dailycounter; 

            //create habit
            if (!added){
                habitList.prepend(
                    '<li >' +
                        '<ul class="habit-info">' +
                            '<li><div class="habit-name">' + title + '</div></li>' +
                            '<li><img class="habit-icon" src='+icon_src+' id='+icon_id+' alt="habit icon"></li>'+
                        '</ul>' +
                        '<div class="message">' + 
                            '<span class="message-total">' +
                                '<strong>' + daycounter + '</strong> days in a row! Best Record: <strong>' + record + '</strong><br>' +
                                '<svg height="25" width="150">' +
                                    '<line class="progress" x1="0" y1="0" x2="' + portion + '" y2="0" style="stroke:rgba(65, 131, 215, 0.8);stroke-width:25" />' +
                                    '<line class="bar" x1="'+ portion + '" y1="0" x2="150" y2="0" style="stroke:rgba(171,171,171,0.6);stroke-width:25" />' +
                                '</svg>' +
                            '</span><br>' +
                            '<span class="message-today">Completed <strong>' + dailycounter + '/' + dailyfrequency + '</strong> for today!</span>' +
                        '</div>' +
                        '<div class="habit-op">' +
                            '<button type="button" id= "increment" class="op op-done" onclick="updateProgress(this,' + dailycounter + ');" title="done" value='+snapshot.key()+'>' +
                                '<img src="../img/done.svg" alt="Done">' +
                            '</button>' +
                            '<button type="button" class="op op-edit" onclick="editPageTransition(this.id)" title="edit habit" id='+snapshot.key()+'>' +
                                '<img src="../img/edit.svg" alt="Edit">' +
                            '</button>' +
                            '<button type="button" id="delete" class="op op-del" onclick="deleteHabit(this)" title="delete habit" value='+snapshot.key()+'>' +
                                '<img src="../img/delete.svg" alt="Del">' + 
                            '</button>' +
                        '<div>' +
                    '</li>'
                ).children().animate({right: '0px'}, 750);
            }
        });
    }, function (errorObject) {
    });  
  } else {
    Rollbar.info("User is logged out");
    window.location.href = "../src/login.html";
  }
}




