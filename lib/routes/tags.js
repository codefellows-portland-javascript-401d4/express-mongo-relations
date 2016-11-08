const express = require('express');
const bodyParser = require('body-parser').json();

const Tag = require('../models/tag');
const Note = require('../models/note');
const WebArticle = require('../models/web-article');

const router = express.Router();

router
  //serves all tags if GET req for '/tags'
  .get('/', (req, res, next) => {
    Tag.find()
      .lean()
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
  //serves specific tag if GET for specific id w/all notes & web articles that have that specific tag
  .get('/:tagId', (req, res, next) => {
    const tagId = req.params.tagId;

    Promise
      .all([
        //get tag data, lean cuz no saving
        Tag.findById(req.params.id).lean(),
        Note
            //tagId: tagId
            .find({tagId})
            .select('title text')
            .lean(),
        WebArticle
            .find({tagId})
            .select('title description url authorFirst authorLast')
            .lean()
      ])
      .then(([tag, notes, webArticles]) => {
        let mistake = {};
        //if tag does not exist
        if (!tag) {
          mistake.code = 404;
          mistake.error = 'That tag does not exist. Perhaps you meant to create a new tag?';
          next(mistake);
        //if tag is empty of description
        }else{
          tag.notes = notes;
          tag.webArticles = webArticles;
          res.send({message: 'Your tag has been found', data: tag});
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //writes new tag to database
  .post('/', bodyParser, (req, res, next) => {
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
  //adds new tag to specific note
  .put('/:tagId/notes/:noteId', bodyParser, (req, res, next) => {
    Note.findByIdAndUpdate(req.params.noteId)
      .then((note) => {
        note.tagId = req.params.tagId;
        return note.save();
      })
      .then((note) => {
        res.send({message: 'Your tag has been added to the note', data: note});
      })
      .catch(next);
  })
  //adds new tag to specific web article
  .put('/:tagId/web-articles/:webArticleId', bodyParser, (req, res, next) => {
    WebArticle.findByIdAndUpdate(req.params.webArticleId)
    .then((webArticle) => {
      webArticle.tagId = req.params.tagId;
      return webArticle.save();
    })
    .then((webArticle) => {
      res.send({message: 'Your tag has been added to the web article', data: webArticle});
    })
    .catch(next);
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