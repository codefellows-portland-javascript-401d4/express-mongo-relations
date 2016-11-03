This is a simple express persistent file api that uses mongodb to store data.

Content: 
This database contains pacific northwest trees of the two main types, gymnosperms(non-flowering trees) and angiosperms(true flowering trees), as well as animals (carnivores, omnivores, and herbivores);

Directions:
send all requests to the following fields:
  Url: 'localhost:3200/api/trees' or 'localhost:3200/api/trees/gymnosperms' or 'localhost:3000/api/trees/angiosperms'
  Url: 'localhost:3200/api/animals' or 'localhost:3200/api/animals/carnivores' or 'localhost:3000/api/animals/omnivores'

GET: see a list of entries
    All trees in the database:                   Url: 'localhost:3200/api/trees'
    All gymnosperms in the database:             Url: 'localhost:3200/api/trees/gymnosperms'
    All angiosperms in the database:             Url: 'localhost:3200/api/trees/angiosperms'
    
GET by genus:


POST: add a tree to the database
    You can add a tree to the trees database and the program will sort it automatically 
   Example: {name: 'douglas fir', type: 'gymnosperm', genus: 'Pseudotsuga'}                 
   Post Url: 'localhost:3200/api/trees'

DELETE: a tree or animal by id
DELETE all:

extra function:
      typing the url http://localhost:3200/api/trees/ecosystem will calculate the ecosystem based on the prevalence of douglas fir trees.


