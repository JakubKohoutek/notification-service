import bodyParser from 'body-parser';
import express from 'express';
import {Server} from 'http';

import serviceUp from './controller/serviceUp';
import sendSMS from './controller/smsNotification';
import sendEmail from './controller/emailNotification';

import allowOnlyAuthenticated from './middleware/allowOnlyAuthenticated';

const PORT = process.env.PORT || 4280;

export const createServer = (): Server => {
  // Create server
  const app = express();

  // Add middleware
  app.use(bodyParser.json());

  // Add services
  app.get('/', serviceUp);
  app.post('/sms', allowOnlyAuthenticated, sendSMS);
  app.post('/email', allowOnlyAuthenticated, sendEmail);

  // Listen on selected port
  return app.listen(PORT, (): void => {
    console.info(`Notification service is listening on port ${PORT}!`);
  });
};
