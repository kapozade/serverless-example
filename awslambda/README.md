## Serverless Framework AWS Lambda Function

Read more about Serverless Framework: https://www.serverless.com/framework/docs/getting-started

Prerequisites to create a serverless project
* Install serverless globally. Run `npm install serverless -g`
* Install serverless-offline. Run `npm i serverless-offline`
* Add serverless-offline package under `plugins` section of the serverless.yml file.

Below command creates a AWS lambda project that can be tested local API calls. 

`sls create -t aws-nodejs -p apigateway`

To run the project in your local environment, run below command

`sls offline start`

### Project dependencies
* NodeJS 14
* mongoDB
