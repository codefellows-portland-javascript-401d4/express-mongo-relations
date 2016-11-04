const bodyParser = require('body-parser').json();
const express = require('express');
const router = express.Router();
const Noble= require('../model/noble');
const House= require('../model/house');

router
//get nobles and also queries
    .get('/', function (req, res, next) {
	const query = req.query;
	console.log(query);
	Noble.find(query)
            .then(noble => res.send(noble ))
            .catch(next);
})

//get all ladies
    .get('/ladies', bodyParser, function (req, res, next) {
	Noble.find({female: true})
            .then(noble => res.send(noble ))
            .catch(next);
})

//get all lords
    .get('/lords', bodyParser, function (req, res, next) {
	Noble.find({female: false})
            .then(noble => res.send(noble ))
            .catch(next);
})


//add noble to the db if they don't already exist
//also adds nobles to houses at the same time
    .post('/', bodyParser, function(req, res, next){  
	Noble.find({name: req.body.name})
     .then(name => {
	if(name.length>0){
		res.send('The database already has a noble of that name.');
		throw new Error;
	}
	Promise
            .all([
	House.find({name: req.body.house}, function (err, house){
		if (house){
			var newMember = house[0].members;
			newMember.push(req.body.name);
	        House.findByIdAndUpdate(house[0].id, { members: newMember })
              .then(saved => res.send(saved));
		}
	}),
	new Noble(req.body).save()
        .then (saved => res.send(saved )),
])
     
      
        .catch(next);
});
})


//allows users to update nobles by id
    .put('/:id', bodyParser, function(req, res, next){
	Noble.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
})

//allows users to delete the Nobles by id
//also removes nobles from houses.
    .delete('/:id', function (req, res, next) {
	Noble.remove({_id : req.params.id})
            .then(deleted => res.send(deleted ))
            .catch(next);
});

//allows users to delete all nobles
//     .delete('/', function (req, res, next) {
// 	Noble.remove({})
//             .then(deleted => res.send(deleted ))
//             .catch(next);
// });





module.exports = router;


  
