const Reminder = require('../lib/models/reminder');
const assert = require('chai').assert;

describe('reminder model', () => {
  it('validates a reminder with a title', done => {
    const reminder = new Reminder({
      title: 'test'
    });
    reminder.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('requires reminder to have a title', done => {
    const reminder = new Reminder({
      body: 'I have no title :('
    });
    reminder.validate(err => {
      assert.isOk(err);
      done();
    });
  });

  it('sets default location to an empty string', done => {
    const reminder = new Reminder({
      title: 'title',
      body: 'I dont have a location'
    });
    reminder.validate(() => {
      assert.deepEqual(reminder.location, '');
      done();
    });
  });
});
