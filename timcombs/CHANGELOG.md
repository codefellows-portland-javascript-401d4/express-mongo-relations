# Change Log
All changes to this project will be documented in this CHANGELOG

Format based on Keep a Changelog (http://keepachangelog.com/)
and project adheres to Semantic Versioning (http://semver.org).

## [2.0.0] - 2016-11-08
### Changed
- new authenicate/authorize system
- refactored tests
- API access more restricted
- merged index.js into server.js

### Added
- auth directory w/ files:
  - ensure-auth.js - checks user authentication
  - ensure-role.js - checks user authorization
  - token.js - signing up and verifying tokens
  - user.js - user model
  - auth.js - routes for authentication and authorization
- more tests



## [1.1.0] - 2016-11-08
### Changed
- refactor how notes and web-articles acquire their tags
- refactor tests
- README.md

### Added
- api.test.js - combined e2e testing for all routes
- /GET route in tags.js to populate notes and web articles with tags


## [1.0.0] - 2016-11-06
### Changed
- mvp functionality

### Added
- get all notes, web articles or tags functionality
- get specific note, web article or tag functionality
- post note, web article or tag functionality
- delete note, web article or tag functionality
- update note, web article or tag functionality
- get last 5 updated notes functionality

- unit testing to tags, web articles and notes routes
- e2e tests
- README.md
