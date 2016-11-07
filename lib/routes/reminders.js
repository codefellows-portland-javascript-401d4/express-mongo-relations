const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Reminder = require('../models/reminder');
const Note = require('../models/note');

router
  .get('/', (request, response, next) => {
    Reminder.find()
      .select('title location date')
      .then(reminders => response.send(reminders))
      .catch(next);
  })

  .get('/:id', (request, response, next) => {
    const reminderId = request.params.id;
    Promise.all([
      Reminder.findById(reminderId).select('title location date').lean(),
      Note.find({reminderId})
      .select('title body')
      .lean()
    ])
    .then(([reminder, notes]) => {
      reminder.notes = notes,
      response.send(reminder);
    })
    .catch(next);
  })
  .post('/', bodyParser, (request, response, next) => {
    new Reminder(request.body).save()
      .then(saved => response.send(saved))
      .catch(next);
  })
  .put('/:id', bodyParser, (request, response, next) => {
    Reminder.findByIdAndUpdate(request.params.id, request.body, {new : true})
      .then(updated => response.send(updated))
      .catch(next);
  })
  .put('/:reminderId/notes/:noteId', bodyParser, (request, response, next) => {
    Note.findById(request.params.noteId)
      .then(note => {
        note.reminderId = request.params.reminderId;
        return note.save();
      })
      .then(note => response.send(note))
      .catch(next);
  })
  .delete('/:id', (request, response, next) => {
    Reminder.remove({_id : request.params.id})
      .then(() => response.send('You have deleted a reminder!'))
      .catch(next);
  })
  .delete('/', (request, response, next) => {
    Reminder.remove()
      .then(() => response.send('You have deleted everything!'))
      .catch(next);
  });


module.exports = router;
