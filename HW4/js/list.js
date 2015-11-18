    /* Sortable list items */
    var el = document.getElementById('habit-list');
    var sortable = Sortable.create(el);

    $(window).load(function() {
     var habitList = document.getElementById('habit-list').children;
    
         for (var i = 0; i < habitList.length; i++){
             habitList[i].style.opacity = 0; 
             habitList[i].style.position = 'relative';
             habitList[i].style.right = '1000px';
         }
         fadeAllIn(); 
     });
    
     function fadeAllIn(){
         var habitList = document.getElementById('habit-list').children;
         var delay = 0; 
    
         for (var i = 0; i < habitList.length; i++){
             habitList[i].style.opacity = 1; 
             $(habitList[i]).delay(delay).animate({right: '0px'}, 750); 
             delay+=100; 
         }
     }
    
     function updateProgress(element){
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
        } 

        var errorId = 0;
        function incrementId(){
            //keep track of clicks 
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
     
     function deleteHabit(element){
         var child = element.parentNode.parentNode;
         var parent = child.parentNode;
    
         ///Slides up to delete 
         $(child).closest('li').slideUp('slow', function(){
             $(child).remove(); 
         }); 
    
         //Fades out the child to delete
         $(child).fadeOut(500, function(){ $(this).remove();});
     
     }
    
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


    

