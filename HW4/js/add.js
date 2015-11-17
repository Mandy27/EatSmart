function toggleReminder(){
	$(".hide").toggleClass("reminderDivShow");
	$(".fa-chevron-right").toggleClass("fa-chevron-down");
}

function alldayCheckbox(){
	if ($('#allday').prop('checked')) {
		var temp = $('.timepicker');
		for(var i = 0; i < temp.length; i++){
			$('.timepicker')[i].readOnly = true;
		}
		$('.text-format').addClass('hideTimepicker');
	}
	else {
		var temp = $('.timepicker');
		for(var i = 0; i < temp.length; i++){
			$('.timepicker')[i].readOnly = false;
		}
		$('.text-format').removeClass('hideTimepicker');
	}
}