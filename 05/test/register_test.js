var assert = require('assert');
var route = require('../src/index.js');
var request = require('superagent');

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

describe('POST /register', function() {
  it('should return 201', function(done) {
    request
      .post('http://localhost:3000/register')
      .send('username=tester')
      .send('password=tester')
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 201);
        done();
      });
  });
});
