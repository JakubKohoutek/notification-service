import bodyParser from 'body-parser';
import express, {Request, Response} from 'express';
import {Server} from 'http';

const PORT = process.env.PORT || 4280;

export const createServer = (): Server => {
  // Create server
  const app = express();

  // Add middleware
  app.use(bodyParser.json());

  // Add services
  app.get('/', async (req: Request, res: Response): Promise<Response> =>
    res.send('Notification service is up and running.')
  );

  // Listen on selected port
  return app.listen(PORT, (): void => {
    console.info(`Notification service is listening on port ${PORT}!`);
  });
};
