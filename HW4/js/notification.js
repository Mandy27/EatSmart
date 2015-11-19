var data = [{"title":"Sleep 8 hours", "weekly_frequency":[1,3,5], "daily_frequency":1,"time_interval":1,"from":"2:27", "to":"5:30"},
				{"title":"Bite nails", "weekly_frequency":[2,3,4], "daily_frequency":1,"time_interval":2, "from":"2:29", "to":"13:00"}];
var newData = data;
var count = 1;
function parseData(){
	var today = new Date();
	var currentTime = toSecond(today.getHours()+":"+today.getMinutes());
	for(var i = 0; i< newData.length; i++){
		var from = toSecond(newData[i].from);
		var to = toSecond(newData[i].to);
		newData[i].next_reminder_time = calculateNextTime(currentTime, from, to, newData[i].time_interval);
	}
	newData = _.sortBy(newData, 'next_reminder_time');
}

function reminder(){
	if(count > 0){
		count--;
		parseData();
	};
	var today = new Date();
	var currentTime = toSecond(today.getHours()+":"+today.getMinutes());
	if(currentTime == newData[0].next_reminder_time){
		var item = newData.shift();
		Notification.requestPermission();
	  	var theBody = "It's time to complete "+item.title;
	  	var theIcon = "../img/logo.png";
	  	var theTitle = "Virtue/Vice";
	  	spawnNotification(theBody,theIcon,theTitle);
	  	item.next_reminder_time = calculateNextTime(currentTime,item.from, item.to, item.time_interval);
	  	newData.push(item);
	}  
	setTimeout(reminder, 500);
}
function spawnNotification(theBody,theIcon,theTitle) {
	var options = {
		body: theBody,
		icon: theIcon
	}
	var n = new Notification(theTitle,options);
	setTimeout(n.close.bind(n), 3000); 
}
function toSecond(timeStr) {
 	var time = timeStr.substr(0,timeStr.indexOf(":"))*3600;
 	time += timeStr.substr(timeStr.indexOf(":")+1)*60;
 	return time;
}
function calculateNextTime(currTime, from, to, n){
	if(currTime >= from && currTime <= to){
		var nextTime = from;
		var curr = currTime;
		while(nextTime < curr){
			nextTime += n *3600;
		}
		if(nextTime <= to)
			return nextTime;
	}
	return 30*3600; 
}