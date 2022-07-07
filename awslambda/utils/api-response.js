const buildResponse = (statusCode) => {
  const response = {
    statusCode: statusCode
  };

  return response;
}

const buildResponseWithData = (statusCode, data) => {
  let response = buildResponse(statusCode);
  response.body = JSON.stringify(data);

  return response;
}

const buildErrorResponseWithMessage = (statusCode, message) => {
  const errorMessage = {
    message: message
  };
  let response = buildResponse(statusCode);
  response.body = JSON.stringify(errorMessage);

  return response;
}

module.exports = {
  buildResponse,
  buildResponseWithData,
  buildErrorResponseWithMessage
};
