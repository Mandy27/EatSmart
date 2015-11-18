//when "save it" is clicked
function editHabit(){
	//return an error when habit title is not correctly filled out
	var x = document.forms["myForm"]["habit"].value;
		if (x == "" | x == null  ){
			alert("Habit must be added!");
			return false; 
		}

	//return modified habit to the list (Firebase?)
}
