function displayHabits (name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(title+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};

function updateProgress(element, int) {
    var msgElement = (element.parentNode.parentNode.getElementsByClassName("message-today"))[0];
    $(msgElement).animate({opacity: 1}, 300); 

    //Progress bar animation 
    var progress = element.parentNode.parentNode.getElementsByClassName('progress');
    var oldx2 = progress[0].getAttribute('x2'); 

    var bar = element.parentNode.parentNode.getElementsByClassName('bar');
    var oldx1 = bar[0].getAttribute('x1'); 
    
    int++;

    // Animates from current location on the bar 
    $({x2:oldx2}).animate(
        {x2: (Number(oldx2) + 5) + 'px'},
        {
            duration:200,
            step:function(now){$(progress).attr('x2', now);
            queue: false; 
        }
    });

    $({x1:oldx1}).animate(
        {x1: (Number(oldx1) + 5) + 'px'},
        {
            duration:200,
            step:function(now){$(bar).attr('x1', now);
            queue: false; 
        }
    });

    //keep track of clicks 
    var incrementProgress = new Firebase('https://burning-heat-9490.firebaseio.com/');

    //creates a new, incremental record
    $('#increment').on('click', incrementId);

    var errorId = 0;
    //creates a new, incremental record
    function incrementId(){
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
    }

    //create new incremental record
    function addRecord(id) {
        setTimeout(function() {
            incrementProgress.child('records').child('rec'+id).set('record #'+id, function(err) {
                err && setError(err);
            });        
        });
    }
}

/* Transition animations when a habit is deleted */
function deleteHabit(element) {
    var ref = new Firebase('https://burning-heat-9490.firebaseio.com/Custom');
    ref.onAuth(function(authData){
        ref = ref.child(authData.uid);
        var habit = ref.child('Habits');
        var flag = confirm("Are you sure you want to delete the habit?");
        if(flag === true){
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
var errorId = 0;
function incrementId(){
    var incrementProgress = new Firebase('https://burning-heat-9490.firebaseio.com/');
    //increment the counter
    incrementProgress.child('progressCounter').transaction(function(currentValue){
        return (currentValue || 0) + 1
    });
}   

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
/***********************Authentication*************************/
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://burning-heat-9490.firebaseio.com/");
//ref.unauth();
ref.onAuth(authDataCallback);
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
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
        ref.on('child_added', function (snapshot) {
            // get data
            var data = snapshot.val();
            var title = data.title;
            var dailyfrequency = data.daily_frequency;
            var dailycounter = 0;
            var daycounter = 10;
            var record = 20;
            var delay = 0; 
            
            //create habit
            habitList.prepend(
                '<li >' +
                    '<ul class="habit-info">' +
                        '<li><div class="habit-name">' + title + '</div></li>' +
                    '</ul>' +
                    '<div class="message">' + 
                        '<span class="message-total">' +
                            '<strong>' + daycounter + '</strong> days in a row! Best Record: <strong>' + record + '</strong><br>' +
                            '<svg height="25" width="150">' +
                                '<line class="progress" x1="0" y1="0" x2="60" y2="0" style="stroke:rgba(65, 131, 215, 0.8);stroke-width:25" />' +
                                '<line class="bar" x1="60" y1="0" x2="150" y2="0" style="stroke:rgba(171,171,171,0.6);stroke-width:25" />' +
                            '</svg>' +
                        '</span><br>' +
                        '<span class="message-today">Completed <strong>' + dailycounter + '/' + dailyfrequency + '</strong> for today!</span>' +
                    '</div>' +
                    '<div class="habit-op">' +
                        '<button type="button" id= "increment" class="op op-done" onclick="updateProgress(this,' + dailycounter + ');" title="done">' +
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
            ).children().animate({right: '0px'}, 750);;
        });
    }, function (errorObject) {
    });  
  } else {
    console.log("User is logged out");
    window.location.href = "../src/login.html";
  }
}




