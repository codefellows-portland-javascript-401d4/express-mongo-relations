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
// 	Promise
//             .all([
// 	House.find({house: houseID}).lean(),
//                 // get nobles
// 	Noble
//                     // only in this house
//                     .find({house: houseID})
//                     //only select names
//                     .select('name')
//                     .lean()
// ])
//             .then(([house, nobles]) => {
// 	house.members = nobles;
// 	console.log('nobles are ', nobles);
// 	console.log('house is ', house);
// 	res.send(house);
// })
    //         .then put('/:id', bodyParser, function(req, res, next){
	// House.findByIdAndUpdate(req.params.id, req.body)
    //         .then(saved => res.send(saved))
    //         .catch(next);






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
});



module.exports = router;
  
