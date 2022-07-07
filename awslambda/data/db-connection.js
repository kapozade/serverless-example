require('dotenv').config({path: './.env'});
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = connectToDatabaseAsync = async () => {
  try{ 
    const databaseConnection = await mongoose.connect(process.env.DB);
  } catch(error) {
    console.error(`Error occured while connecting to db: ${error}`);
    process.exit(1);
  }
}