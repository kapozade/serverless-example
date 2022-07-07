const connectToDatabaseAsync = require('./db-connection');
const Note = require('./models/note');

const getByIdAsync = async (id) => {
  await connectToDatabaseAsync();
  const note = await Note.findById(id);

  return note;
}

const getAllAsync = async () => {
  await connectToDatabaseAsync();
  const notes = await Note.find().sort({createdOn: 1});
  
  return notes;
}

const addAsync = async (title, description, reminder, status, category) => {
  await connectToDatabaseAsync();
  const noteObject = new Note({
    title,
    description,
    reminder,
    status,
    category
  });
  const note = await Note.create(noteObject);

  return note;
}

const putAsync = async (id, title, description, reminder, status, category) => {
  await connectToDatabaseAsync();
  const note = await Note.findById(id);
  if(note) {
    note.title = title || note.title;
    note.description = description || note.description;
    note.reminder = reminder || note.reminder;
    note.status = status || note.status;
    note.category = category || note.category;
  }

  const newNote = await note.save();
  return newNote;
}

const deleteAsync = async(id) => {
  await connectToDatabaseAsync();
  const note = await Note.findByIdAndRemove(id);

  return note;
}

module.exports = {
  getByIdAsync,
  getAllAsync,
  addAsync,
  putAsync,
  deleteAsync
};