import aws from 'aws-sdk';

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION} = process.env;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_DEFAULT_REGION) {
  console.log(`AWS environment variable(s) missing, can't initialize the SDK`);
  process.exit(1);
}

const s3Config = {
  sslEnabled: true,
};

const s3 = new aws.S3(s3Config);
