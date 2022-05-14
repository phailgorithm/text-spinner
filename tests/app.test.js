const request = require('supertest');
const app = require('../src/app');
const { version } = require('../package.json');

test('GET /', () => {
  request(app)
    .get('/')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        api: 'text-spinner',
        version: version,
      });
    });
});

test('GET /text-spinner/:id with no auth header', () => {
  request(app)
    .get('/text-spinner/1')
    .then((response) => {
      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual(
        'No credentials sent. User header Authorization: Bearer <token>'
      );
    });
});

test('GET /text-spinner/:id with invalid auth header', () => {
  request(app)
    .get('/text-spinner/1')
    .set('Authorization', 'invalid auth header')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});

test('GET /text-spinner/:id with missing bearer', () => {
  request(app)
    .get('/text-spinner/1')
    .set('Authorization', 'sometoken')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});

test('GET /text-spinner/:id with wrong bearer', () => {
  request(app)
    .get('/text-spinner/1')
    .set('Authorization', 'bearer sometoken')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});

test('GET /text-spinner/:id with missing token', () => {
  request(app)
    .get('/text-spinner/1')
    .set('Authorization', 'Bearer')
    .then((response) => {
      expect(response.statusCode).toBe(422);
      expect(response.text).toEqual(
        'Invalid auth header format. Should be: Bearer <token>'
      );
    });
});
