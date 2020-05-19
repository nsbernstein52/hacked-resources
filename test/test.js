// npm i chai -D
// npm i supertest -D

const chai = require('chai');
const supertest = require('supertest');
const expressApp = require('../server/app.js');

describe ('routes', () => {
  // get root endpoint
  describe('root', () => {
    it('should respond with: "text/html; charset=UTF-8"', () => {
      return(supertest(expressApp).get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
      );
    });
  });
  // getAllResources endpoint
  describe('resources_db/resources', () => {
    it('should respond with: "text/html; charset=utf-8"', () => {
      return(supertest(expressApp).get('/resources_db/resources/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
      );
    });
  });
  // getResource endpoint
  describe('resources_db/resources/', () => {
    it('should respond with: "object"', () => {
      return(supertest(expressApp).get('/resources_db/resources/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')
      );
    });
  });
});
