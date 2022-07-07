'use strict';
const notesController = require('./routes/notes/notes');

module.exports.getByIdAsync = async (event) => {
  const id = event.pathParameters.id;

  return await notesController.getByIdAsync(id);
}

module.exports.getAllAsync = async (event) => {
  return await notesController.getAllAsync();
}

module.exports.postAsync = async (event) => {
  return await notesController.postAsync(event.body);
}

module.exports.putAsync = async (event) => {
  const id = event.pathParameters.id;
  const body = event.body;

  return await notesController.putAsync(id, body);
}

module.exports.deleteAsync = async (event) => {
  const id = event.pathParameters.id;
  
  return await notesController.deleteAsync(id);
}
