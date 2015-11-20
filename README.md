# EatSmart
####Implemented Features:
- Added list elements to list page from database ( by Chloe Lopez)
- Create Habit and add in Firebase database. ( by Harrison Wang)
- Edit Habit and save in database ( by Mandy Ngo )
- Delete Habit and save in database ( by Mandy Ngo )
- UI focused JavaScript ( by Christine Lao )
- Saving of some form data in add into database ( by Christine Lao )
- Implemented Online Notification without using any library ( by Mandy Ngo , Tyler Nguyen)

####Notes:
- We haven't implemented multiple users yet.
- We did not implement offline notifications. We do not think that offline notifications are necessary because they are rarely (if ever) implemented on websites. If we were creating a native app for Android or iOS, this would certainly be necessary. However, even the most popular online services (Faceboook, Twitter, Slack) do not send offline notifications through their web applications. Push notifications are provided through native applications instead.
- We have not deployed the app. Therefore, in order for the notification to work properly, please in Terminal go into the project directory and run " python -m SimpleHTTPServer 8000 ". In addition, if the app is in fullscreen mode, the notification won't be displayed.

####Browser Conformance: 
- When running opening on Internet Explorer, it prompts you on whether you would like to enable ActiveX control in order to see the blocked content. 
- On Internet Explorer and Mozilla Firefox, the reminder time input boxes overflow onto the next line. This does not happen in Chrome. 
- When deleting a habit, Mozilla will prompt the user, asking if they want to disable dialog windows from the app, while Internet Explorer and Chrome do not. 