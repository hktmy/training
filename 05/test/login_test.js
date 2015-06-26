var assert = require('assert');
var route = require('../src/index.js');
var request = require('superagent');

describe('GET /login', function() {
  it('should return 200', function(done) {
    request
      .get('http://localhost:3000/login')
      .end(function (err, res) {
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});

describe('POST /login', function() {
  context('valid parameter', function() {
    it('should return 200', function(done) {
      request
        .post('http://localhost:3000/login')
        .send('username=soneda')
        .send('password=aaaaaa')
        .end(function (err, res) {
          assert.strictEqual(res.status, 200);
          done();
        });
    });
  });
  context('invalid parameter', function() {
    it('should return 200', function(done) {
      request
        .post('http://localhost:3000/login')
        .send('username=invalida')
        .send('password=invalid')
        .end(function (err, res) {
          assert.strictEqual(res.status, 401);
          done();
        });
    });
  });
});
