'use strict';
const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server/server.js');
const gmApiUrl = require('../server/config/gmApiConfig');

let id1 = 1234;
let id2 = 1235;
let noId = 12345;

describe ('VehiclesApi Functionality', () => {

  it('GET to /vehicles/:id should respond with status 404 for invalid id', (done) => {
    request(server)
      .get('/vehicles/' + noId)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.exist;
        done();
      });  
  })

  it('GET to /vehicles/:id should respond with status 200 for valid id', (done) => {
    request(server)
      .get('/vehicles/' + id1)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('vin');
        expect(res.body).to.have.property('color');
        expect(res.body).to.have.property('doorCount');
        expect(res.body).to.have.property('driveTrain');
        done();
      });  
  })

  it('GET to /vehicles/:id should have doorCount 4 for id 1234', (done) => {
    request(server)
      .get('/vehicles/' + id1)
      .end((err, res) => {
        expect(res.body.doorCount).to.equal(4);
        done();
      });  
  })

  it('GET to /vehicles/:id should have doorCount 2 for id 1235', (done) => {
    request(server)
      .get('/vehicles/' + id2)
      .end((err, res) => {
        expect(res.body.doorCount).to.equal(2);
        done();
      });  
  })

  it('GET to /vehicles/:id/doors should respond with status 404 for invalid id', (done) => {
    request(server)
      .get('/vehicles/' + noId + '/doors')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.exist;
        done();
      });  
  })

  it('GET to /vehicles/:id/doors for valid id should respond with status 200 and have location and locked property for each door', (done) => {
    request(server)
      .get('/vehicles/' + id1 + '/doors')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body[0]).to.have.property('location');
        expect(res.body[0]).to.have.property('locked');
        expect(res.body.length).to.equal(4);
        done();
      });  
  })

  it('GET to /vehicles/:id/doors should for valid id 1235 should have length 2 ', (done) => {
    request(server)
      .get('/vehicles/' + id2 + '/doors')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);
        done();
      });  
  })

})