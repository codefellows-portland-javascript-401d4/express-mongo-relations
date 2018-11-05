This module is a http server using ExpressJS which accepts only JSON resources,
and is backed by a persistent MongoDB as a document store.
RESTful and generally CRUDdy (accepts GET, POST, PUT, and DELETE requests).

* Written in ES6, using Node v6+
* Linted with eslint
* Tested with Mocha using the chai-http server testing library

To Use
* Run the server using node server.js -- to interact with the file store,
I recommend using a third-party interface such as the Chrome App Postman.