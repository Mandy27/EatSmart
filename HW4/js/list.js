/*global $ */

/* Sortable list items */
//var el = document.getElementById('habit-list');
//var sortable = Sortable.create(el);
/*var dataRef = new Firebase('https://burning-heat-9490.firebaseio.com/Habits');

var habitList = $('#habit-list');
//var habitInfo = $('#habit-info');*/

/* Fetch habit list data */
/*dataRef.on('child_added', function (snapshot) {
    // get data
    var data = snapshot.val();
    var title = data.title;
    
    console.log(title);
    
    // create elements
    var habitElement = $("<li>");
    var titleElement = $("<div class='habit-name'></div>");
    
    titleElement.text(title);
    habitElement.text("message").prepend(titleElement);
    
    // add habit
    habitList.html(habitElement);
});*/

/* Display habit list */
/*$(window).load(function () {
    var habitList = document.getElementById('habit-list').children;

    for (var i = 0; i < habitList.length; i++){
        habitList[i].style.opacity = 0; 
        habitList[i].style.position = 'relative';
        habitList[i].style.right = '1000px';
    }

    // Add transition
    fadeAllIn(); 
});*/

/* function displayHabits (name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(title+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
}; */

/* Fade-in transition */
/*function fadeAllIn() {
    var habitList = document.getElementById('habit-list').children;
    var delay = 0;

    for (var i = 0; i < habitList.length; i++){
        habitList[i].style.opacity = 1; 
        $(habitList[i]).delay(delay).animate({right: '0px'}, 750); 
        delay+=100; 
    }
}*/

function updateProgress(element) {
     var msgElement = (element.parentNode.parentNode.getElementsByClassName("message-today"))[0];
     //alert(msgElement.innerHTML);
     $(msgElement).animate({opacity: 1}, 300); 
     //msgElement.style.visibility="visible";

     //Progress bar animation 
     var progress = element.parentNode.parentNode.getElementsByClassName('progress');
     var oldx2 = progress[0].getAttribute('x2'); 

     var bar = element.parentNode.parentNode.getElementsByClassName('bar');
     var oldx1 = bar[0].getAttribute('x1'); 

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

function deleteHabit(element, string) {
    var child = element.parentNode.parentNode;
    var parent = child.parentNode;

     ///Slides up to delete 
     $(child).closest('li').slideUp('slow', function(){
         $(child).remove(); 
     }); 

     //Fades out the child to delete
     /*$(child).fadeOut(500, function(){ $(this).remove();});

         $({x1:oldx1}).animate(
             {x1: (Number(oldx1) + 5) + 'px'},
             {
                 duration:200,
                 step:function(now){$(bar).attr('x1', now);
                 queue: false; 
             }
         });*/
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

 function editPageTransition(){
     var habitList = document.getElementById('habit-list').children;
     var delay = 0; 
     //var n = child.nextElementSibling;
     console.log(habitList); 
     for (var i = 0; i < habitList.length; i++){
         console.log(habitList[i]); 
          //Slides to the left of the screen to delete 
         habitList[i].style.position = 'relative'; 
         if (i != habitList.length - 1){
             $(habitList[i]).delay(delay).animate({right: '1500px'}, 500); 
             delay+=100; 
         }
         else{
             $(habitList[i]).delay(delay).animate({right: '1500px'}, 500, function(){window.location.href='edit.html'}); 
         }
     }
 }

 function addPageTransition(){
     var habitList = document.getElementById('habit-list').children;
     var delay = 0; 
     for (var i = 0; i < habitList.length; i++){
         habitList[i].style.position = 'relative'; 
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




