## Meet-Up Event Planner

This is my first project as part of the Senior Web Developer Nano Degree through Udacity.

To test on mobile I've uploaded this project to my temporary web server, the project can be found here: <http://79.170.44.81/ianemcallister.com/eventPlanner/index.html#/">

**Requirnments**

* Must provide uers with a form to create a user account.
* Should allow users to create a new event.
* Should display events that have been created.
* Should respond to touches naturally.
* The form is understandable while using a screen reader.
* Should be responsive (equally functional on mobile and desktop).


**Front End**

I've used AngularJS as my front end framework.  It handles my routes and MV* structure for this single-page application.

**Back End**

Instead of writing a backend I'm utilizing Firebase to store objects in the cloud.

**Development Environment**

I like the responsive feedback that gulp and browser-sync provide.  I used eslint for linting.  I hoped to play with sass for styles, but didn't get around to it.  I used sourcemaps and uglify to prepare the application for production.

**Known Bugs**

This project is not production complete.  If I were to publish this project as production-ready I would fix the following bugs first:


* When users create an account, if their email address has been invited to events before add their pending events to their new profile
* When users are invited to an event they are sent an e-mail with a link to the event
* I would refactor the code to clean up the controllers, using more factores, as per the suggestions of [John Papa](https://www.pluralsight.com/authors/john-papa") of pluralsight, [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md)
* I could generally like to clean the code up, it could be far more concise.
