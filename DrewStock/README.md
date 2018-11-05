# express-mongo-relations: coded by [Drew Stock] (https://github.com/DrewStock)
==================================================
This app launches a local HTTP server which is backed by a persistent data store. The server responds to GET, POST, PUT and DELETE requests for resources '/teams' and '/players', with the domain being my fantasy football league. :football:

...with the bonus of being powered by Express! :train:

...and Mongo! :floppy_disk:

The following are command line instructions for using the app.

* After cloning the repo:
    * type 'npm install'
    * refer to env.example to see which environment variables you'll need to set locally
* To launch the app and run tests:
    * type 'npm start'
* To launch the app:
    * type 'node server.js'
    * this creates a local HTTP server, which will be listening on port 5000
* Overview of functionality:
    * GET request to '/api/teams' or '/api/players', where resources are stored - server writes response text, a list of resources
    * GET request for '/api/teams/:id' or '/api/players/:id' - server writes response text, which is the contents of the resource
    * POST request for '/api/teams' or '/api/players' - server writes response text and creates a new resource, whose contents are the parsed body of the request
    * PUT request for resource at '/api/teams/:id' or '/api/players/:id' - server writes response text and creates a new resource (if not already existing) or updates an existing resource. The updated contents of the resource are the parsed body of the request
    * DELETE request to '/api/teams' or '/api/players' - server writes response text and deletes resource
    * Related the 'team' and 'player' models:
        * The 'player' model has a 'teamId' property, which is a reference to the ObjectId property of the 'team' model
        * the 'team' model has a 'rosterId' property, which is a reference to the ObjectID property of the
        'player' model
        * The 'teamId' and 'rosterId' properties can be updated on instances of 'player' and 'team' documents, so that a team can be related to a player and players can be related to a team
    * Added user management and authentication for accessing resources:
        * POST request to '/api/auth/signup' to signup with username, password and roles
            * password is hashed using bcryptjs and a JSON Web Token (JWT) is returned when 'signup' is successful
        * POST request to '/api/auth/signin'
            * JWT is returned when 'signin' is successful
        * to access the resources at '/api/players', a user must include a valid JWT in the request authorization header
        * to access the resources at '/api/teams', a user must include a valid JWT in the request authorization header AND have a user role of 'admin'
