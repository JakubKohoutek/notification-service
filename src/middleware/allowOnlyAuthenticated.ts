import {Request, Response, NextFunction} from 'express';

const {ACCESS_TOKEN} = process.env;

if (!ACCESS_TOKEN) {
  console.log('Missing access token in environment variables');
  process.exit(1);
}

type BodyWithToken = {
  token?: string;
}

const allowOnlyAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const {token} = req.body as BodyWithToken;

    if (!token) {
      res.status(401).send({error: 'API token missing.'});
      return;
    }

    if (token !== ACCESS_TOKEN) {
      res.status(401).send({error: 'API token incorrect.'});
      return;
    }

    next();
  } catch (error) {
    console.error(error);

    res.status(500).send({error: error.message});
  }
};

export default allowOnlyAuthenticated;