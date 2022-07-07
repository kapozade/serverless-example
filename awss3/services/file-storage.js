require('dotenv').config({path: './.env'});
const AWS = require('aws-sdk');

const createS3Client = () => {
  const awsS3Client = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint(process.env.S3_HOST),
  });

  return awsS3Client;
}

const uploadObjectsAsync = async (objects) => {
  const awsS3Client = await createS3Client();
  let promises = [];
  objects.forEach((object) => {
    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: object.key,
      Body: object.content,
      ContentType: object.contentType,
      ACL: 'public-read',
    };

    const promise = awsS3Client.putObject(s3Params).promise();
    promises.push(promise);
  });

  await Promise.all(promises).then((values) => {});
}

module.exports = {
  uploadObjectsAsync
};
