import AWS from 'aws-sdk';

export {PublishInput} from 'aws-sdk/clients/sns';
export {SendEmailRequest} from 'aws-sdk/clients/ses';

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_DEFAULT_REGION) {
  console.log(`AWS environment variable(s) missing, can't initialize the SDK`);
  process.exit(1);
}

export const SNS = new AWS.SNS({region: process.env.AWS_DEFAULT_REGION});

export const SES = new AWS.SES({region: process.env.AWS_DEFAULT_REGION});
