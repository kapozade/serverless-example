const { getByIdAsync, getAllAsync, addAsync, putAsync, deleteAsync } = require('../data/notes-repository');

const getNoteByIdAsync = async (id) => {
  return await getByIdAsync(id);
}

const getAllNotesAsync = async () => {
  return await getAllAsync();
}

const createNoteAsync = async (title, description, reminder, status, category) => {
  return await addAsync(title, description, reminder, status, category);
}

const updateNoteAsync = async (id, title, description, reminder, status, category) => {
  const note = await getByIdAsync(id);
  if(!note){
    return null;
  }

  return await putAsync(id, title, description, reminder, status, category);
}

const deleteNoteAsync = async(id) => {
  return await deleteAsync(id);
}

module.exports = {
  getNoteByIdAsync,
  getAllNotesAsync,
  createNoteAsync,
  updateNoteAsync,
  deleteNoteAsync
};