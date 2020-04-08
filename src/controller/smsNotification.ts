import aws from 'aws-sdk';
import {Request, Response} from 'express';

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION} = process.env;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_DEFAULT_REGION) {
  console.log(`AWS environment variable(s) missing, can't initialize the SDK`);
  process.exit(1);
}

const s3Config = {
  sslEnabled: true,
};

new aws.S3(s3Config);

type MessageRequestBody = {
  phoneNumber?: string;
  message?: string;
}

const sendSMS = async (req: Request, res: Response): Promise<void> => {
  try {
    const {phoneNumber, message} = req.body as MessageRequestBody;

    if (!phoneNumber || !message) {
      res.status(400).send({error: 'Phone number or message missing.'});
      return;
    }

    res.status(200).send({result: 'Message sent'});
  } catch (error) {
    console.error(error);

    res.status(500).send({error: error.message});
  }
};

export default sendSMS;