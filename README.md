This is a simple express persistent file api that uses mongodb to store data.

Content: 
This database contains lords and ladies and houses from westeros, the continent from Game of thrones.

Directions:
send all requests to the following field:
  Url: 'localhost:3000/api/westeros' 


GET: see a list of entries
    All lords and ladies in the database:       Url: 'localhost:3000/api/westeros/nobles'
    All houses in the database:                 Url: 'localhost:3000/api/westeros/houses'
    All lords in the data base:                 Url: 'localhost:3000/api/westeros/nobles/lords'
    All ladies in the data base:                Url: 'localhost:3000/api/westeros/nobles/ladies'
    All lords and ladies of a specific house    Url: 'localhost:3000/api/westeros/houses/$house'
    All old nobles                              Url: 'localhost:3000/api/westeros/nobles/old'
    All nobles who died young                   Url: 'localhost:3000/api/westeros/nobles/died-young'

you can also enter specific queries.  
for example:   'localhost:3000/api/westeros/nobles&dead=true' would return all dead nobles.
for example:   'localhost:3000/api/westeros/house&sigil=stag' would return house Baratheon.
  
  
POST: add a noble to the database.  This will also attach them to their particular house.

PUT: update an entry by id.

DELETE: a noble or house by ID
