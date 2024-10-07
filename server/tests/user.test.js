const request = require('supertest');
const app = require('../index.js'); // Assurez-vous que le chemin vers votre fichier app.js est correct

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
