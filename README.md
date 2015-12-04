# EatSmart

Please use the following URL to see our application: https://shrouded-depths-7682.herokuapp.com/src/login.html

####Implemented Features:
- Added list elements to list page from database (by Chloe Lopez)
- Create Habit and add in Firebase database. (by Harrison Wang)
- Implement Grunt for minification and bundling (by Harrison Wang, Mandy Ngo)
- Deploy application with Heroku (by Harrison Wang) 
- Edit Habit and save in database (by Mandy Ngo)
- Delete Habit and save in database (by Mandy Ngo)
- UI focused JavaScript (by Christine Lao)
- Implemented Online Notification without using any library (by Mandy Ngo, Tyler Nguyen)
- Generated .apk using Phonegap Build (by Chloe Lopez)
- Packaged Google Chrome Extension (by Chloe Lopez)

####Front-End
- HTML
- CSS
- Javascript

####Backend 
- Firebase

####Javascript Libraries Used
- jquery-1.11.3.min.js
- bootstrap.min.js

####Error Tracking
- Rollbar

####PhoneGap
The app was packaged using Phonegap Build. From this, we were able to generate a .apk file. The javascript would need to be adjusted for it to work correctly with the Phonegap framework, but it is compatible with the Firebase database. We did not create an iOS app because it requires a developer certification. 

####Grunt
This task runner is used to automate the minification of HTML, CSS, and Javascript files. Grunt and Grunt plugins are installed and managed via npm, the Node.js package manager. The plugins used include: cssmin, uglify, and nodemon. 

####Browser Conformance: 
- When running opening on Internet Explorer, it prompts you on whether you would like to enable ActiveX control in order to see the blocked content. 
- On Internet Explorer and Mozilla Firefox, the reminder time input boxes overflow onto the next line. This does not happen in Chrome. 
- When deleting a habit, Mozilla will prompt the user, asking if they want to disable dialog windows from the app, while Internet Explorer and Chrome do not. 

####Google Chrome Extension
The app has been packaged as a Google Chrome extension. It requires some JavaScript alterations in order to work correctly. Firebase is compatible with Chrome extensions, but we encountered problems with content security policies. The content security policy is included in manifest.json, but there are still JS errors. Also, Google Chrome does not allow inline scripts for security reasons, so inline scripts must be removed.
