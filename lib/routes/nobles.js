const bodyParser = require('body-parser').json();
const express = require('express');
const router = express.Router();
const Noble= require('../model/noble');
const House= require('../model/house');

router
//houses and also queries
    .get('/', function (req, res, next) {
	const query = req.query;
	console.log(query);
	Noble.find(query)
            .then(house => res.send(house ))
            .catch(next);
})

//add house to the db
    .post('/', bodyParser, function(req, res, next){
        var newMember = [];  	
	Promise
            .all([
	House.find({name: req.body.house})


                    
            .then (house => findByidAndUpdate(house[0].id, { members: house[0].members.push(req.body.name)}))
            .then(saved => res.send(saved))
          ])
        .catch(next);
});



//  if (!p)
//     return next(new Error('Could not load Document'));
//   else {
//     // do your updates here
//     p.modified = new Date();

//     p.save(function(err) {
//       if (err)
//         console.log('error')
//       else
//         console.log('success')
//     });

	// new Noble(req.body).save()
    //     .then(console.log(req.body.house))
    //     .find({})
    //     .then (saved => res.send(saved ))


module.exports = router;


  
