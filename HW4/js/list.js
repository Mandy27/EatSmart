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
    console.log(element.value);
    var ref = new Firebase('https://burning-heat-9490.firebaseio.com/');
    var habit = ref.child('Habits');
    habit.child(element.value).remove();
    var child = element.parentNode.parentNode;
    var parent = child.parentNode;

     ///Slides up to delete 
     $(child).closest('li').slideUp('slow', function(){
         $(child).remove(); 
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




