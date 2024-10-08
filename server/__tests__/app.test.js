process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../index'); 

describe('GET /', () => {
  it('should respond with a status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
