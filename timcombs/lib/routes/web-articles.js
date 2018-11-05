const express = require('express');
const bodyParser = require('body-parser').json();

const WebArticle = require('../models/web-article');

const router = express.Router();

router
  //serves all web articles if GET req for '/web-articles'
  .get('/', (req, res, next) => {
    WebArticle.find()
      .populate({
        path: 'tagId',
        select: 'name'
      })
      .lean()
      .then((data) => {
        if (data.length === 0) {
          res.send({message: 'There are no web articles, add some!'});
        }else{
          res.send(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //serves specific web article if GET for specific id
  .get('/:id', (req, res, next) => {
    WebArticle.findById(req.params.id)
      .then((data) => {
        let mistake = {};
        //if web article does not exist
        if (!data) {
          mistake.code = 404;
          mistake.error = 'That web article does not exist. Perhaps you meant to add a new web article?';
          next(mistake);
        //if web article is empty of url
        }else if (data && !data['url']) {
          mistake.code = 405;
          mistake.error = 'That web article exists, but has no URL. Perhaps you meant to update that article?';
          next(mistake);
        }else{
          res.send({message: 'Your article has been found', data: data});
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //writes new web article to the database
  .post('/', bodyParser, (req, res, next) => {
    new WebArticle(req.body).save()
      .then((data) => {
        res.send({message: 'Your article has been stashed', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //updates web article in database
  .put('/:id', bodyParser, (req, res, next) => {
    WebArticle.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      .then((data) => {
        res.send({message: 'Your article has been updated', data: data});
      })
      .catch((err) => {
        next(err);
      });
  })
  //deletes web article from database
  .delete('/:id', (req, res, next) => {
    WebArticle.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.send({message: 'Your article has been deleted', data: data});
      })
      .catch((err) => {
        let mistake = {};
        //from the error object
        if (err.value === 'nofile') {
          mistake.code = 404;
          mistake.error = 'That web article does not exist. Perhaps you meant to create a new web article.';
        }else{
          mistake.code = 500;
        }
        next(mistake);
      });
  });

module.exports = router;