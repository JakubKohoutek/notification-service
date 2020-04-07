import {createServer} from './server';

(async () => {
  try {
    createServer();
  } catch (error) {
    console.error(error);
  }
})();
