# express mongo relations database server lab for CodeFellows 401

### Creator
 - Tim Combs

### Project Functionality
  - This is a Code Fellows Lab Assignment to create an http express server that uses mongoDB for persistent storage and retrieval and mongoose as the templating and validation layer - it creates a database for notes, web articles and tags and relations between the collections
  - The http server runs on localhost:3535

  - server.js is the server, listener and the entry point to the project
  - app.js is the request handler
  - notes.js & tags.js & web-articles.js are the routes
  - errHandler.js handles sending error messages to the client
  - note.js & tag.js & web-article.js are the schematic models
  - set-mongoose.js handles connection to the database

  - Upon navigating to specific paths, client will be able to get all documents, get specific documents, create new documents, update existing documents and delete specific documents for each collection - notes and tags
  - The database methods are implemented in the routes files for each collection: notes.js, web-articles.js & tags.js
    - GET all requests for the /notes, /web-articles or /tags
    - GET requests for the /notes/:id, /web-articles/:id or /tags/:id
    - GET requests for the last 5 updated records for /notes
    - GET requests for specific key=value pairs
    - POST requests for the /notes/:id, /web-articles/:id or /tags/:id
    - PUT requests to overwrite for the /notes/:id, /web-articles/:id or /tags/:id
    - DELETE requests for the /notes/:id, /web-articles/:id or /tags/:id
  
  - Different responses and errors will be written to the browser and/or logged to the console dependent on specific path &/or request method
  - Notes & tags & web articles are stored and returned to client as JSON files

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

  - navigating to localhost:3535/notes, localhost:3535/web-articles or localhost:3535/tags serves all the documents for the respective collection
  - navigating to localhost:3535/<notes_webarticles_tags>/<specific_note_or_webarticle_or_tag_id> serves the specific document

  - navigating to localhost:3535/notes/last5/notes serves the last 5 updated notes

  - sending a POST request to localhost:3535/<notes_webarticles_tags>/<<specific_note_or_webarticle_or_tag> writes the note, web article or tag into the database, displays a success message and serves the document to the client

  - sending a PUT request to localhost:3535/<notes_webarticles_tags>/<specific_note_or_webarticle_or_tag> updates/overwrites the note, web article or tag into the database, displays a success message and serves the document to the client

  - sending a DELETE request to localhost:3535/<notes_webarticles_tags>/<specific_note_or_webarticle_or_tag> deletes the note, web article or tag from the database and displays 'Your file has been deleted'

  - navigating to other localhost:3535/<something_else> logs 404 status code and serves a failure message to the client
  

### Testing
  - Set Up
    - To run the test suite, from the command line at the root of the project directory type:
      ```
      $ npm test
      ```
    - this will first run eslint - for more info look at .eslintrc
    - then mocha will use the exmorel-test-db database to run unit tests and e2e tests
    
  - simple testing can be done using a browser for GET requests or an app like Postman [https://www.getpostman.com/] for the other request methods

### Code Shape
  - This code has been vetted using Eslint and was reviewed by Code Fellows using Travis-CI

### Collborations/Questions/issues
  - Not currently looking for collaborators at this time
  - Any questions and concerns can be handled by opening an issue on the codebase

### License
  - Licensed under the MIT license - see LICENSE.md for more info
