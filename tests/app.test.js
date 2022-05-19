const request = require('supertest');
const app = require('../src/app');

test('GET /api/v1/spinners/:id with no auth header', () => {
  request(app)
    .get('/api/v1/spinners/1')
    .then((response) => {
      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual(
        'No credentials sent. User header Authorization: Bearer <token>'
      );
    });
});

test('GET /api/v1/spinners/:id with invalid auth header', () => {
  request(app)
    .get('/api/v1/spinners/1')
    .set('Authorization', 'invalid auth header')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});

test('GET /api/v1/spinners/:id with missing bearer', () => {
  request(app)
    .get('/api/v1/spinners/1')
    .set('Authorization', 'sometoken')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});

test('GET /api/v1/spinners/:id with wrong bearer', () => {
  request(app)
    .get('/api/v1/spinners/1')
    .set('Authorization', 'bearer sometoken')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});

test('GET /api/v1/spinners/:id with missing token', () => {
  request(app)
    .get('/api/v1/spinners/1')
    .set('Authorization', 'Bearer')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});
