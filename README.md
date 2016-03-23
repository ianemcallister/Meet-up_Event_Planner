## Meet-Up Event Planner

This is my first project as part of the Senior Web Developer Nano Degree through Udacity.

To test on mobile I've uploaded this project to my temporary web server, the project can be found here: http://79.170.44.81/ianemcallister.com/eventPlanner/index.html#/

**Requirnments**

* Must provide users with a form to create a user account.
* Should allow users to create a new event.
* Should display events that have been created.
* Should respond to touches naturally.
* The form is understandable while using a screen reader.
* Should be responsive (equally functional on mobile and desktop).

**Build Steps**
* `npm install`
* `gulp`
* Serve files via static fileserver (or run `gulp serve` to open up browsersync)

**Front End**

I've used AngularJS as my front end framework.  It handles my routes and MV* structure for this single-page application.

**Back End**

Instead of writing a backend I'm utilizing Firebase to store objects in the cloud.

**Development Environment**

I like the responsive feedback that gulp and browser-sync provide.  I used eslint for linting.  I hoped to play with sass for styles, but didn't get around to it.  I used sourcemaps and uglify to prepare the application for production.
