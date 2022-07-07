'use strict';

const imagesController = require('./routes/image/image');

module.exports.image = async (event) => {
  return await imagesController.postAsync(event.body);
};
