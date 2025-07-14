import {Request, Response} from 'express';

import {SES, SendEmailRequest} from '../utils/aws';

type EmailRequestBody = {
  email?: string;
  subject?: string;
  body?: string;
};

const sendEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, subject, body} = req.body as EmailRequestBody;

    if (!email || !subject || !body) {
      res.status(400).send({error: 'Email, subject or body missing.'});
      return;
    }

    const emailRequest: SendEmailRequest = {
      Destination: {
        ToAddresses: [email],
      },
      Source: `Notification Service <${process.env.VERIFIED_EMAIL_ADDRESS}>`,
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: body,
          },
        },
      },
    };

    await SES.sendEmail(emailRequest).promise();

    const timestamp = new Date();
    console.log(`[${timestamp.toUTCString()}] Email message sent:`);
    console.dir({
      email,
      subject,
      body,
    });
    res.status(200).send({result: 'Email sent'});
  } catch (error) {
    console.error(error);

    const errorMessage =
      typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error occurred while sending email.';

    res.status(500).send({error: errorMessage});
  }
};

export default sendEmail;