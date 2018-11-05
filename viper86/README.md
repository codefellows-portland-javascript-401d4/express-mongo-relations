# Express-Mongoose-Relations
## Video Games and Characters

### Avaliable Paths
#### GET
* /games
    * displays all games in database
* /games/:id
    * displays single game with associated characters
* /games?developer=\<developer\>
    * can query by developer
* /characters
    * displays all characters in database
* /characters/:id
    * displays single character
* /characters?sex=male/female
    * can query by male or female

#### POST
* /games
    * creates new game in database
* /characters
    * creates new character in database

#### PUT
* /games/:id
    * updates specific game
* /characters/:id
    * updates specific character

#### DELETE
* /games/:id
    * deletes specific game
* /characters/:id
    * deletes specific character

