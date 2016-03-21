<h2 style="color:blue">Meet-Up Event Planner</h2>

<p>This is the first assignment as part of the Senior Web Developer Nano Degree through Udacity.<p>

<p>To test on mobile I've uploaded this project to my temporary web server, the project can be found here: <a href="http://79.170.44.81/ianemcallister.com/eventPlanner/index.html#/">http://79.170.44.81/ianemcallister.com/eventPlanner/index.html#/</a> </p>

<p><strong>Requirnments</strong></p>

<p>
<ol>
<li>Must provide uers with a form to create a user account.</li>
<li>Should allow users to create a new event.</li>
<li>Should display events that have been created.</li>
<li>Should be responsive (equally functional on mobile and desktop).</li>
</ol>
</p>

<p><strong>Front End</strong></p>

<p>I've used AngularJS as my front end framework.  It handles my routes and MV* structure for this single-page application.</p>

<p><strong>Back End</strong></p>

<p>Instead of writing a backend I'm utilizing Firebase to store objects in the cloud.</p>

<p><strong>Development Environment</strong></p>

<p>I like the responsive feedback that gulp and browser-sync provide.  I used eslint for linting.  I hoped to play with sass for styles, but didn't get around to it.  I used sourcemaps and uglify to prepare the application for production.</p>

<p><strong>Known Bugs</strong></p>

<p>This project is not production complete.  If I were to publish this project as production-ready I would fix the following bugs first:</p>

<p><ul>
	<li>When users create an account, if their email address has been invited to events before add their pending events to their new profile</li>
	<li>When users are invited to an event they are sent an e-mail with a link to the event</li>
	<li>I would refactor the code to clean up the controllers, using more factores, as per the suggestions of <a href="https://www.pluralsight.com/authors/john-papa">John Papa</a> of pluralsight, <a href="Angular 1 Style Guide">https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md</a></li>
	<li></li>
</ul></p>