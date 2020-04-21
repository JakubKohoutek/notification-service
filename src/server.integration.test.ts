import {Server} from 'http';
import request from 'supertest';

import {createServer} from './server';

jest.mock('./utils/aws', () => ({
  SNS: {
    publish: (message: any) => ({
      promise: () => Promise.resolve(message),
    }),
  },
  SES: {
    sendEmail: (emailRequest: any) => ({
      promise: () => Promise.resolve(emailRequest),
    }),
  },
}));

describe('Server', () => {
  let app: Server | undefined;

  beforeEach(() => {
    app = createServer();
  });

  afterEach(() => {
    if (app) {
      app.close();
    }
  });

  it('should respond with OK status on get request', async () => {
    const result = await request(app).get('/');

    expect(result.status).toEqual(200);
    expect(result.text).toEqual('Notification service is up and running.');
  });

  describe('SMS service', () => {
    const smsRequest = {
      token: process.env.ACCESS_TOKEN,
      message: 'ahoj',
      phoneNumber: '+420123456789',
    };
    const smsPath = '/sms';

    it('should return unauthenticated if token is missing', async () => {
      const {token, ...smsRequestWithoutToken} = smsRequest;

      const result = await request(app).post(smsPath).send(smsRequestWithoutToken);

      expect(result.status).toEqual(401);
      expect(JSON.parse(result.text)).toEqual({error: 'API token missing.'});
    });

    it('should return unauthenticated if token is incorrect', async () => {
      const result = await request(app)
        .post(smsPath)
        .send({
          ...smsRequest,
          token: 'wrong',
        });

      expect(result.status).toEqual(401);
      expect(JSON.parse(result.text)).toEqual({error: 'API token incorrect.'});
    });

    it('should return error if phone number is missing', async () => {
      const {phoneNumber, ...smsRequestWithoutPhone} = smsRequest;

      const result = await request(app).post(smsPath).send(smsRequestWithoutPhone);

      expect(result.status).toEqual(400);
      expect(JSON.parse(result.text)).toEqual({
        error: 'Phone number or message missing.',
      });
    });

    it('should return error if message is missing', async () => {
      const {message, ...smsRequestWithoutMessage} = smsRequest;

      const result = await request(app).post(smsPath).send(smsRequestWithoutMessage);

      expect(result.status).toEqual(400);
      expect(JSON.parse(result.text)).toEqual({
        error: 'Phone number or message missing.',
      });
    });

    it('should not allow forbidden country codes', async () => {
      const result = await request(app)
        .post(smsPath)
        .send({
          ...smsRequest,
          phoneNumber: '+012345678910',
        });

      expect(result.status).toEqual(403);
      expect(JSON.parse(result.text)).toEqual({error: 'Country code not allowed.'});
    });

    it('should not allow long messages', async () => {
      const result = await request(app)
        .post(smsPath)
        .send({
          ...smsRequest,
          message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla neque tortor, eleifend quis ante nec, tincidunt malesuada magna. Lorem ipsum dolor sit amet.',
        });

      expect(result.status).toEqual(403);
      expect(JSON.parse(result.text)).toEqual({
        error: 'Message size exceeded the allowed limit of 140 bytes.',
      });
    });

    it('should send SMS', async () => {
      const result = await request(app).post(smsPath).send(smsRequest);

      expect(result.status).toEqual(200);
      expect(JSON.parse(result.text)).toEqual({
        result: 'Message sent',
      });
    });
  });

  describe('Email service', () => {
    const emailRequest = {
      token: process.env.ACCESS_TOKEN,
      email: 'foobar@domain.com',
      subject: 'Test email subject',
      body: '<b>Test email body</b>',
    };
    const emailPath = '/email';

    it('should return unauthenticated if token is missing', async () => {
      const {token, ...emailRequestWithoutToken} = emailRequest;

      const result = await request(app).post(emailPath).send({emailRequestWithoutToken});

      expect(result.status).toEqual(401);
      expect(JSON.parse(result.text)).toEqual({error: 'API token missing.'});
    });

    it('should return unauthenticated if token is incorrect', async () => {
      const result = await request(app)
        .post(emailPath)
        .send({
          ...emailRequest,
          token: 'wrong',
        });

      expect(result.status).toEqual(401);
      expect(JSON.parse(result.text)).toEqual({error: 'API token incorrect.'});
    });

    it('should return error if email is missing', async () => {
      const {email, ...emailRequestWithoutEmail} = emailRequest;

      const result = await request(app).post(emailPath).send(emailRequestWithoutEmail);

      expect(result.status).toEqual(400);
      expect(JSON.parse(result.text)).toEqual({error: 'Email, subject or body missing.'});
    });

    it('should return error if body is missing', async () => {
      const {body, ...emailRequestWithoutBody} = emailRequest;

      const result = await request(app).post(emailPath).send(emailRequestWithoutBody);

      expect(result.status).toEqual(400);
      expect(JSON.parse(result.text)).toEqual({error: 'Email, subject or body missing.'});
    });

    it('should return error if subject is missing', async () => {
      const {subject, ...emailRequestWithoutSubject} = emailRequest;

      const result = await request(app).post(emailPath).send(emailRequestWithoutSubject);

      expect(result.status).toEqual(400);
      expect(JSON.parse(result.text)).toEqual({error: 'Email, subject or body missing.'});
    });

    it('should send email', async () => {
      const result = await request(app).post(emailPath).send(emailRequest);

      expect(result.status).toEqual(200);
      expect(JSON.parse(result.text)).toEqual({
        result: 'Email sent',
      });
    });
  });
});
