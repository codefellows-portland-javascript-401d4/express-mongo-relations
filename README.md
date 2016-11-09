# Overview

This is an express mongo api with 2 related resources (notes and reminders) completed for the express-mongo-relations assignment.

## Endpoints

Paths beginning with '/notes' are used to make calls to the notes API. Paths beginning with '/reminders' are used to make calls to the reminders API.

### Notes

The schema for the notes requires a title which must be a string. The optional parameters are a body which is also a string, a reminderId which references a reminder resource, and a done which is a boolean. The requests that can be made on the API are as follows.

#### GET

- '/notes' will retrieve all notes. If the note has a reminderId it will also display the data for the corresponding reminder.

- '/notes/:id' will retrieve the note with the corresponding id property. If it has a reminderId property it will also display the data for the reminder.

- '/notes/todo' will retrieve all notes with a done property equal to false.

#### POST

- '/notes' will create a note resource if the supplied request body complies with the previously described schema for a note resource. By default done will be set to false.

#### PUT

- '/notes/:id' will update the resource corresponding to the given id assuming that the request body complies with the note schema.

#### DELETE

- '/notes' will delete all note resources.
- '/notes/:id' will delete the resource corresponding to the id given as a parameter.

### Reminders

The schema for a reminder resource requires a title which is a string. It also has the optional properties location and date which are also both strings.

#### GET

- '/reminders' returns all reminder resources.
-'/reminder/:id' returns the resource corresponding the the given id parameter. If there are note resources with the same id as their reminderId, it will also return these in the notes property of the resource.

#### POST/PUT/DELETE

These request all follow the exact same structure and form as those for the notes API.
