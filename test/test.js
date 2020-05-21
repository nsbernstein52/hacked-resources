const chai = require('chai');
const chaiHttp = require('chai-http');
const expressApp = require('../server/app.js');

chai.use(chaiHttp);
const expect = chai.expect;

describe ('SERVER API: route to root', () => {
  describe('root:  status, type', () => {
    it('should respond with: 200, "html" ', async () => {
      const response = await chai.request(expressApp).get('/');
      expect(response).to.have.status(200);
      expect(response).to.be.html;
    });
  });
});

// resource_db elements
describe ('SERVER/DB:API: resoures_db', () => {
  // getAllResources
  describe('resources_db/resources/: status, type, body type, data type, level', () => {
    it('should respond with:  200, json, "object", "array", "All" ', async () => {
      const response = await chai.request(expressApp).get('/resources_db/resources/');
      expect(response).to.have.status(200);
      expect(response).to.be.json;
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data[19]).to.be.an('object');
      expect(response.body.data[19].topic).to.equal('bundler');
    });
  });
  // getResource
  describe('resources_db/resources/17:  status, body type, topic', () => {
    it('should respond with:  200, "array", "object", "string", "auth" ', async () => {
      const response = await chai.request(expressApp).get('/resources_db/resources/17');
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.be.an('object');
      expect(response.body[0].abbrev).to.be.an('string');
      expect(response.body[0].abbrev).to.equal('auth');
    });
  });
});
