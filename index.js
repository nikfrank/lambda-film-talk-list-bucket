const AWS = require('aws-sdk');

let TO_BUCKET;

if( process.env.MODE === 'LOCAL' ){
  const credentials = new AWS.SharedIniFileCredentials({
    profile: 'default'
  });
  AWS.config.credentials = credentials;
  AWS.config.region = 'us-west-2';
  
  const localConfig = require('./config-local.json');
  TO_BUCKET = localConfig.TO_BUCKET;
} else {
  const lambdaConfig = require('./config-lambda.json');
  TO_BUCKET = lambdaConfig.TO_BUCKET;
}

const s3 = new AWS.S3();

exports.handler = (event, context)=>
  s3.listObjectsV2({
    Bucket: 'lambda-film-talk-output'
  }, (err, contents)=>{
    err ? context.fail(err) : context.succeed({
      statusCode: 200,
      body: contents
    })
  });
