function toggleReminder(){
	$(".reminderDiv").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}

//when "save it" is clicked
function addHabit(){
	//return an error when habit title is not correctly filled out
	var x = document.forms["myForm"]["habit"].value;
		if (x == "" | x == null  ){
			alert("Habit must be added!");
			return false; 
		}

	//add the habit to the list	(Firebase?)
}

//navigate to the list (Firebase?)
function habitIconClick(){
}


