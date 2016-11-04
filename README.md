This is a simple express persistent file api that uses mongodb to store data.

Content: 
This database contains lords and ladies and houses from westeros, the continent from Game of thrones.

Directions:
send all requests to the following field:
  Url: 'localhost:3600/api/westeros' 


GET: see a list of entries
    All lords and ladies in the database:       Url: 'localhost:3600/api/westeros/nobles'
    All houses in the database:                 Url: 'localhost:3600/api/westeros/houses'
    All lords in the data base:                 Url: 'localhost:3600/api/westeros/lords'
    All ladies in the data base:                Url: 'localhost:3600/api/westeros/ladies'
    All lords and ladies of a specific house    Url: 'localhost:3600/api/westeros/nobles/$house'

you can also enter specific queries.  
for example:   'localhost:3600/api/westeros/nobles&dead=true' would return all dead nobles.
for example:   'localhost:3600/api/westeros/house&sigil=stag' would return house Baratheon.
  
  
POST: add a noble to the database

POST: a
    You can add a tree to the trees database and the program will sort it automatically 
   Example: {name: 'douglas fir', type: 'gymnosperm', genus: 'Pseudotsuga'}                 
   Post Url: 'localhost:3200/api/trees'

PUT: update an entry by id.

DELETE: a noble or house by ID


extra function: Fighting
      typing the url 'localhost:3600/api/westeros/fight/house1&house2 will cause the two houses to battle.

