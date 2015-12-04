# EatSmart

Please use the following URL to see our application: https://shrouded-depths-7682.herokuapp.com/src/login.html

####Implemented Features:
- Added list elements to list page from database (by Chloe Lopez)
- Create Habit and add in Firebase database. (by Harrison Wang)
- Edit Habit and save in database (by Mandy Ngo)
- Delete Habit and save in database (by Mandy Ngo)
- Implement multiple users and login credentials (by Mandy Ngo, Tyler Nguyen)
- UI focused JavaScript (by Christine Lao)
- Implemented Online Notification without using any library (by Mandy Ngo, Tyler Nguyen)
- Generated .apk using Phonegap Build (by Chloe Lopez)
- Packaged Google Chrome Extension (by Chloe Lopez)
- Implement NodeJs, Grunt, Nodemon, Uglify, CSSMin for minifications, bundling, automating file modification updates (by Harrison Wang, Mandy Ngo)
- Deploy application with Heroku (by Harrison Wang) 
- Counter and record added to Firebase database (by Christine Lao)
- Included Error Tracking using Rollbar (by Christine Lao)
- Included User Analytics using Mixpanel (by Christine Lao)

####Front-End
- HTML
- CSS
- Javascript

####Backend 
- Firebase
- Nodejs

####Javascript Libraries Used
- jquery-1.11.3.min.js
- bootstrap.min.js
- lodash v3.10.1

####Error Tracking - Rollbar
We deployed error tracking in Heroku, and logged a few debug and info messages using Rollbar. And during production, Rollbar kept track of the errors that were appearing in JavaScript.
Login: clao@ucsd.edu
Password: eatsmart

####User Analytics - Mixpanel
We tracked events such as page views, what the user were doing with habits, and whether or not the user successfully signed up. Using this information, we created a funnel checking the completion rate of a user loging in after reaching the login page. Additionally we kept track of how long it took a user to edit a habit. User profiles were also created to track what users where doing in the application. And kept track of the number of habits a user was keeping at any time.
Login: clao@ucsd.edu
Password: eatsmart

####Mobile POC - PhoneGap
The app was packaged using Phonegap Build. From this, we were able to generate a .apk file. The javascript would need to be adjusted for it to work correctly with the Phonegap framework, but it is compatible with the Firebase database. We did not create an iOS app because it requires a developer certification. The .apk is included in the HW5 folder.

####Task Automation - Grunt
This task runner is used to automate the minification of HTML, CSS, and Javascript files. Grunt and Grunt plugins are installed and managed via npm, the Node.js package manager. The plugins used include: cssmin, uglify, and nodemon. Gruntfile.js is used to configure tasks and load plugins. 

####Browser Conformance: 
- When running opening on Internet Explorer, it prompts you on whether you would like to enable ActiveX control in order to see the blocked content. 
- On Internet Explorer and Mozilla Firefox, the reminder time input boxes overflow onto the next line. This does not happen in Chrome. 
- When deleting a habit, Mozilla will prompt the user, asking if they want to disable dialog windows from the app, while Internet Explorer and Chrome do not. 

####Google Chrome Extension
The app has been packaged as a Google Chrome extension. It requires some JavaScript alterations in order to work correctly. Firebase is compatible with Chrome extensions, but we encountered problems with content security policies. The content security policy is included in manifest.json, but there are still JS errors. Also, Google Chrome does not allow inline scripts for security reasons, so inline scripts must be removed.
