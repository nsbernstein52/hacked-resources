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

// respond with arrays, object, and other data with appropriate properties
describe ('resource elements DISINCT', () => {
  // get QQQ
  describe('resources_db/resources/', () => {
    it('should return an object of an array object of objects', (done) => {
      return(supertest(expressApp)
        // .get('resources_db/resources/')
        .get('/') // {data: [ { id: 1 ... } ] }
        .end((err, response) => {
          if (err) { return done(err); }
          let body = response.body;
          console.log("body: ", body);
          // .expect(true, true);
          // assert.equal(Array.isArray(items), true);
          // done();
          return(true);
        }));
    });
  });
});
