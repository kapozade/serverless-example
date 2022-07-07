const { StatusCodes } = require('http-status-codes');
const ObjectId = require('mongoose').Types.ObjectId;
const { createNoteAsync, getNoteByIdAsync, getAllNotesAsync, updateNoteAsync, deleteNoteAsync } = require('../../services/notes-service');
const { buildResponse,buildResponseWithData, buildErrorResponseWithMessage } = require('../../utils/api-response');

const notesEndpoint = () => {
  return {
    postAsync: async (body) => {
      try {
        const { title, description, reminder, status, category } = body;
        const response = await createNoteAsync(title, description, reminder, status, category);
        
        return buildResponseWithData(StatusCodes.CREATED, response);
      } catch (error){
        console.log(error);
        return buildErrorResponseWithMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
    },
    getByIdAsync: async (id) => {
      try {
        const response = await getNoteByIdAsync(id);
        if(response){
          return buildResponseWithData(StatusCodes.OK, response);
        }
        else {
          return buildResponse(StatusCodes.NOT_FOUND);
        }
      } catch (error) {
        console.log(error);
        return buildErrorResponseWithMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
    },
    getAllAsync: async () => {
      try {
        const response = await getAllNotesAsync();
        return buildResponseWithData(StatusCodes.OK, response);
      } catch (error) {
        console.log(error);
        return buildErrorResponseWithMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
    },
    putAsync: async(id, body) => {
      try {
        const { title, description, reminder, status, category } = body;
        const response = await updateNoteAsync(id, title, description, reminder, status, category);
        if(response){
          return buildResponseWithData(StatusCodes.OK, response)
        }
        else {
          return buildResponse(StatusCodes.NOT_FOUND);
        }
      } catch (error) {
        console.log(error);
        return buildErrorResponseWithMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
    },
    deleteAsync: async(id) => {
      try {
        const response = await deleteNoteAsync(id);
        if(response){
          return buildResponse(StatusCodes.OK);
        }
        else {
          return buildResponse(StatusCodes.NOT_FOUND);
        }
        
      } catch (error) {
        console.log(error);
        return buildErrorResponseWithMessage(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
      }
    }
  }
}

const notesController = () => {
  return {
    postAsync: async (body) => {
      if(!body){
        return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'Body is required');
      }

      const { title, description } = JSON.parse(body);
      if(!title){
        return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'title is required');
      }

      if(!description){
        return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'description is required');
      }
      
      return await notesEndpoint().postAsync(JSON.parse(body));
    },
    getByIdAsync: async (id) => {
      if(!id 
        || !id.match("^([0-9]|[a-z])+([0-9a-z]+)$") 
        || !ObjectId.isValid(id)){
      return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'Invalid ObjectId provided for id value');
    }

      return await notesEndpoint().getByIdAsync(id);
    },
    getAllAsync: async () => {
      return await notesEndpoint().getAllAsync();
    },
    putAsync: async(id, body) => {
      if(!id 
          || !id.match("^([0-9]|[a-z])+([0-9a-z]+)$") 
          || !ObjectId.isValid(id)){
        return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'Invalid ObjectId provided for id value');
      }

      if(!body){
        return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'Body is required');
      }

      return await notesEndpoint().putAsync(id, JSON.parse(body));
    },
    deleteAsync: async(id) => {
      if(!id 
        || !id.match("^([0-9]|[a-z])+([0-9a-z]+)$") 
        || !ObjectId.isValid(id)){
      return buildErrorResponseWithMessage(StatusCodes.BAD_REQUEST, 'Invalid ObjectId provided for id value');
    }

      return await notesEndpoint().deleteAsync(id);
    }
  }
}

module.exports = notesController();