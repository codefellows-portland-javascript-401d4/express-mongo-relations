const express = require('express');
const bodyParser = require('body-parser').json();

const Tag = require('../models/tag');

const router = express.Router();

router
  //serves all tags if GET req for '/tags'
  .get('/', (req, res, next) => {
    Tag.find()
      .then((data) => {
        if (data.length === 0) {
          res.send({message: 'There are no tags, add some!'});
        }else{
          res.send(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //serves specific tag if GET for specifici id
  .get('/:id', (req, res, next) => {
    Tag.findById(req.params.id)
      .then((data) => {
        let mistake = {};
        //if tag does not exist
        if (!data) {
          mistake.code = 404;
          mistake.error = 'That tag does not exist. Perhaps you meant to create a new tag?';
          next(mistake);
        //if tag is empty of description
        }else if (data && !data['description']) {
          mistake.code = 405;
          mistake.error = 'That tag exists but is empty. Perhaps you meant to update that tag?';
          next(mistake);
        }else{
          res.send({message: 'Your tag has been found', data: data});
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //serves all tags with a specific property value
  .get('/search/:prop/:val', (req, res, next) => {
    Tag.find({[req.params.prop]: req.params.val})
      .then((data) => {
        res.send({message: 'Your tags have been found', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //writes new tag to database
  .post('/:id', bodyParser, (req, res, next) => {
    new Tag(req.body).save()
      .then((data) => {
        res.send({message: 'Your tag has been stashed', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //updates tag in database
  .put('/:id', bodyParser, (req, res, next) => {
    //$set to update only the fields specified, w/out update makes non-specified fields null
    //new: true, returns the modified document
    Tag.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    .then((data) => {
      res.send({message: 'Your tag has been updated', data: data});
    })
    .catch((err) => {
      next(err);
    });
  })
  //deletes tag from database
  .delete('/:id', (req, res, next) => {
    Tag.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.send({message: 'Your tag has been deleted', data: data});
      })
      .catch((err) => {
        let mistake = {};
        //from the error object
        if (err.value === 'nofile') {
          mistake.code = 404;
          mistake.error = 'That tag does not exist. Perhaps you meant to create a new tag?';
        }else{
          mistake.code = 500;
        }
        next(mistake);
      });
  });

module.exports = router;