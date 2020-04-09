import {Server} from 'http';
import request from 'supertest';

import {createServer} from './server';

describe('Server', () => {
  let app: Server | undefined;

  afterEach(() => {
    if (app) {
      app.close();
    }
  });

  it('should respond with OK status on get request', async () => {
    app = createServer();

    const result = await request(app).get('/');

    expect(result.status).toEqual(200);
    expect(result.text).toEqual('Notification service is up and running.');
  });
});
