const bodyParser = require('body-parser').json();
const express = require('express');
const router = express.Router();
const House= require('../model/house');
const Noble= require('../model/noble');


router
//houses and also queries
    .get('/', function (req, res, next) {
	const query = req.query;
	console.log(query);
	House.find(query)
            .then(house => res.send(house ))
            .catch(next);
})
        //find a house and all house members
    .get('/:house', (req, res, next) => {
	const houseID = req.params.house;
	House.find({name: houseID})
            .then(house => res.send(house ))
            .catch(next);
})




//add house to the db
    .post('/', bodyParser, function(req, res, next){
	new House(req.body).save()
        .then (saved => res.send(saved ))
        .catch(next);
})

//update houses
    .put('/:id', bodyParser, function(req, res, next){
	House.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
})

//allows users to delete the Nobles by id
//also removes nobles from houses.
    .delete('/:id', function (req, res, next) {
	House.remove({_id : req.params.id})
            .then(deleted => res.send(deleted ))
            .catch(next);
});

//allows users to delete all houses
//     .delete('/', function (req, res, next) {
// 	House.remove({})
//             .then(deleted => res.send(deleted ))
//             .catch(next);
// });


module.exports = router;
  
