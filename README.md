# http hello/goodbye lab1 for CodeFellows 401

### Creator
 - Tim Combs

### Project Functionality
  - This is a Code Fellows Lab Assignment to create an http express server that uses mongoDB for persistent storage and retrieval and mongoose as the templating and validation layer - it creates a database for notes, web articles and tags and relations between the collections
  - The http server runs on localhost:3535

  - server.js is the server
  - index.js is the server listener and the entry point to the project
  - app.js is the request handler
  - notes.js & tags.js are the routes
  - errHandler.js handles sending error messages to the client
  - note.js & tag.js are the schematic models
  - set-mongoose.js handles connection to the database

  - Upon navigating to specific paths, client will be able to get all documents, get specific documents, create new documents, update existing documents and delete specific documents for each collection - notes and tags
  - The database methods are implemented in the routes files for each collection: notes.js & tags.js
    - GET all requests for the /notes or /tags
    - GET requests for the /notes/:id or /tags/:id
    - GET requests for the last 5 updated records for /notes
    - GET requests for records with specific property=value pairs for /notes and /tags
    - POST requests for the /notes/:id or /tags/:id
    - PUT requests to overwrite for the /notes/:id or /tags/:id
    - DELETE requests for the /notes/:id or /tags/:id
  
  - Different responses and errors will be written to the browser and/or logged to the console dependent on specific path &/or request method
  - Notes & tags are stored and returned to client as JSON files

### How To Use Codebase
  - This module uses Node, npm and the following modules:
    - net, http, fs, path modules from node
    - express (for node middleware), morgan (for logging), body-parser (for body parsing), mongoDB (the database), mongoose (for schematic validation, queries and boilerplate)
    - eslint, mocha, chai, chai-http, nodemon for testing
  - Make sure to run npm install from the directory root to install dependencies
  - Please refer to the package.json for more info

  - To use this module as it stands, from the command line at the root of the project directory type:
    ```
    $ npm start
    ``` 
  - Then open a browser window and navigate to the address localhost:3535/

  - This is a back end app, so to implement functionality project should be "wired" to a front end using the route methods from notes.js & tags.js

  - Data flows to and from the mongoDB database as JSON



### Use Cases

  - navigating to localhost:3535/ serves index.html to the browser, which displays 'Serving pages for you using node!'

  - navigating to localhost:3535/notes or localhost:3535/tags serves all the documents for the respective collection
  - navigating to localhost:3535/<notes_or_tags>/<specific_note_id_or_specific_tag_id> serves the specific document

  - navigating to localhost:3535/<notes_or_tags>/search/<specific_property>/<specific_value> serves all the documents that contain the specific property=value pair for the respective collection

  - navigating to localhost:3535/notes/last5/notes serves the last 5 updated notes

  - sending a POST request to localhost:3535/<notes_or_tags>/<specific_note_or_specific_tag> writes the note or tag into the database, displays a success message and serves the document to the client

  - sending a PUT request to localhost:3535/<notes_or_tags>/<specific_note_or_specific_tag> updates/overwrites the note or tag into the database, displays a success message and serves the document to the client

  - sending a DELETE request to localhost:3535/<notes_or_tags>/<specific_note_or_specific_tag> deletes the note from the database and displays 'Your file has been deleted'

  - navigating to other localhost:3535/<something_else> logs 404 status code and serves a failure message to the client
  

### Testing
  - Set Up
    - To run the test suite, from the command line at the root of the project directory type:
      ```
      $ mocha
      ```
    - you will see unit tests for the tags and notes route files and e2e tests

    - mocha will then use a test database notes-test-dbto run through a series of get, push, post & delete requests.

  - simple testing can be done using a browser for GET requests or an app like Postman [https://www.getpostman.com/] for the other request methods

### Code Shape
  - This code has been vetted using Eslint and was reviewed by Code Fellows using Travis-CI

### Collborations/Questions/issues
  - Not currently looking for collaborators at this time
  - Any questions and concerns can be handled by opening an issue on the codebase

### License
  - Licensed under the MIT license - see LICENSE.md for more info
