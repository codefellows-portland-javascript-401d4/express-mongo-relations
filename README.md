Starwars Mongo Database for characters and ships.

Endpoints:

/api/ships
-GET / for all ships
-GET /:id for one ship
-POST / to add a ship. "Name" and "lengthMeters" fields required
  {
    "name": "Tantive IV",
    "lengthMeters": 150,
    "type": "Corellian Corvette"
  }
-PUT /:id to update a ship
-DELETE /:id to remove a ship

/api/characters
-GET / for all characters (with corresponding ship info)
-GET /:id for one character (with corresponding ship info)
-POST / to add a character. "Name" field required.
  {
	"name": "Han Solo",
	"forceUser": false,
	"shipId": "5821049133ced6e059832bd5"
  }
-PUT /:id to update a character
-DELETE /:id to remove a character

/api/capitals
-GET / for all capital ships (length > 100 meters), as well as the average length of all capital ships.
