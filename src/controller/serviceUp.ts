import {Request, Response} from 'express';

const serviceUp = async (req: Request, res: Response): Promise<Response> =>
  res.send('Notification service is up and running.');

export default serviceUp;
