const request = require('supertest');
const app = require('../index.js'); // Assurez-vous que le chemin vers votre fichier index.js est correct

describe('GET /api/users', () => {
  it('should respond with an array of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
