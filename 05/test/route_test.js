var assert = require('assert');
var route = require('../src/index.js');
var request = require('superagent');

describe('GET /', function() {
  it('should return 200', function(done) {
    request
      .get('http://localhost:3000')
      .end(function (err, res) {
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});

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

describe('GET /register', function() {
  it('should return 200', function(done) {
    request
      .get('http://localhost:3000/register')
      .end(function (err, res) {
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});
