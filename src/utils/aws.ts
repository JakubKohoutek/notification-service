import AWS from 'aws-sdk';

export type {PublishInput} from 'aws-sdk/clients/sns';
export type {SendEmailRequest} from 'aws-sdk/clients/ses';

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION} = process.env;

if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_DEFAULT_REGION) {
  console.log(`AWS environment variable(s) missing, can't initialize the SDK`);
  process.exit(1);
}

const SNS = new AWS.SNS({region: process.env.AWS_DEFAULT_REGION});

// Configure default SNS attributes
SNS.setSMSAttributes({
  attributes: {
    DefaultSenderID: 'AlertBot',
    DefaultSMSType: 'Transactional',
  },
}, (err) => {
  if (err) {
    console.error('Error setting SMS attributes:', err);
  } else {
    console.log('SMS attributes set successfully');
  }
});

const SES = new AWS.SES({region: process.env.AWS_DEFAULT_REGION});

export {SNS, SES};
