const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Note = require('../models/note');

router
  .get('/todo', (request, response, next) => {
    Note.findUnfinished()
    .then(notes => response.send(notes))
    .catch(next);
  })
  .get('/', (request, response, next) => {
    Note.find()
      .select('title body reminderId done')
      .populate({
        path: 'reminderId',
        select: 'title location date',
      })
      .lean()
      .then(notes => response.send(notes))
      .catch(next);
  })
  .get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .select('title body reminderId done')
      .populate({
        path: 'reminderId',
        select: 'title location date'
      })
      .lean()
      .then(note => response.send(note))
      .catch(next);
  })
  .post('/', bodyParser, (request, response, next) => {
    new Note(request.body).save()
      .then(saved => response.send(saved))
      .catch(next);
  })
  .put('/:id', bodyParser, (request, response, next) => {
    Note.findByIdAndUpdate(request.params.id, request.body, {new : true})
      .then(updated => response.send(updated))
      .catch(next);
  })
  .delete('/:id', (request, response, next) => {
    Note.remove({_id : request.params.id})
      .then(() => response.send('You have deleted a note!'))
      .catch(next);
  })
  .delete('/', (request, response, next) => {
    Note.remove()
      .then(() => response.send('You have deleted everything!'))
      .catch(next);
  });


module.exports = router;
