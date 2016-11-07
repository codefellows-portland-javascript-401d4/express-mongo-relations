const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const House = require('../models/house');
const Roommate = require('../models/roommate');

router
    .get('/', (req, res, next) => {
        House.find()
            .then(houses => res.send(houses))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const houseId = req.params.id;

        Promise
            .all([
                House.findById(houseId).lean(),
                Roommate
                    .find({houseId})
                    .select(
                        //select properties here
                    )
                    .lean()
            ])
            .then(([house, roommates]) => {
                house.roommates = roommates;
                res.send(house);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        House.removeById(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
    })


    .post('/', bodyParser, (req, res, next) => {
        new House(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        House.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(house => res.send(house))
            .catch(next);
    })

    
    .put('/:houseId/roommates/:roommateId', bodyParser, (req, res, next) => {
        Roommate.findById(req.params.roommateId)
            .then(roommate => {
                roommate.houseId = req.params.houseId;
                return roommate.save();
            })
            .then(roommate => res.send(roommate))
            .catch(next);
    });

module.exports = router;