## Express Mongodb Relationships with Promised Mongoose

This is a NodeJS server using express as a router, it uses a hosted sandbox mongo database with an Mongoose wrapper, and comes with chai-http unit and end to end testing.

#### Authors

[Albert Reel](https://github.com/Waxhoya) and [Chris Bruner](https://github.com/QuantumArchive)


####Version V1.0.0

A fully RESTful API with database relationships between Anime characters and Anime shows.


### Mongo Database and Mongoose

Storage is provided with a Mlab.com hosted Mongodb sandbox. This solution allows multiple developers to access a common database resource while keeping a localhost dev environment. The default will defer to process.env.MONGODB_URI if set. To reconfigure you will need to set line 2 of ./lib/mongoose-setup.js

_/lib/setup-mongoose.js line 2:_
``` Javascript
const dbURI = process.env.MONGODB_URI || 'mongodb://Waxhoya:223codefellows@ds143717.mlab.com:43717/anime';
```


### Express routes

All routes are contained in the routes folder and is a seperate file.
* _site_/lib/routes


### API endpoints

There are 2 API *resources* that will accept *Get* and *Post* requests
* _site:_/animechars
* _site:_/animeshows

The resource will accept *Get, Put,* and *Delete* requests if provided an :id
* _site_/*resource*/:id


### Testing: End-to-End and Unit Testing

* Comprehensive Unit and End-to-End testing is included.
* The tests are scripted to npm test and can also be accessed with mocha.
* The tests are located in the /test folder.
* The tests are mocha, chai and chai-http based.


### Issues

Please feel free to post issues to github
* https://github.com/Waxhoya/express-mongo-relations
