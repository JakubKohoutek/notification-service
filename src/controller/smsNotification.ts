import {Request, Response} from 'express';

import {PublishInput, SNS} from '../utils/aws';

const ALLOWED_COUNTRY_CODES = ['+420'];

const countryCodeIsAllowed = (phoneNumber: string): boolean =>
  ALLOWED_COUNTRY_CODES.some((countryCode) => phoneNumber.startsWith(countryCode));

const messageSizeFitsLimit = (message: string): boolean =>
  Buffer.from(message, 'utf8').byteLength < 140;

type MessageRequestBody = {
  phoneNumber?: string;
  message?: string;
};

const sendSMS = async (req: Request, res: Response): Promise<void> => {
  try {
    const {phoneNumber, message} = req.body as MessageRequestBody;

    if (!phoneNumber || !message) {
      res.status(400).send({error: 'Phone number or message missing.'});
      return;
    }

    if (!countryCodeIsAllowed(phoneNumber)) {
      res.status(403).send({error: 'Country code not allowed.'});
      return;
    }

    if (!messageSizeFitsLimit(message)) {
      res.status(403).send({error: 'Message size exceeded the allowed limit of 140 bytes.'});
      return;
    }

    const messageParams: PublishInput = {
      Message: message,
      PhoneNumber: phoneNumber,
    };

    await SNS.publish(messageParams).promise();

    const timestamp = new Date();
    console.log(`[${timestamp.toUTCString()}] SMS message sent:`);
    console.dir(messageParams);
    res.status(200).send({result: 'Message sent'});
  } catch (error) {
    console.error(error);
    const errorMessage =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error occurred while sending SMS.';
    res.status(500).send({error: errorMessage});
  }
};

export default sendSMS;