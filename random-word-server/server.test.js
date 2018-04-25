const request = require('supertest');
const app = require('./server.js');

describe('root path', () => {
  test('responds with status 200 the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200);
    })
  });
  test('response is a five-letter word', () => {
    return request(app).get("/").then(response => {
      expect(response.text.length).toBe(5);
    })
  });
})