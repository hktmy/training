var assert = require('assert');
var request = require('superagent');
var config = require('./config/config.json');
var host = config.host;

describe('GET /register', function() {
  it('should return 200', function(done) {
    request
      .get(host + '/register')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});

describe('POST /register', function() {
  context('valid parameter', function() {
    it('should return 200', function(done) {
      request
        .post(host + '/register')
        .send('username=tester')
        .send('password=tester')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 200);
          done();
        });
    });
  });
  context('invalid parameter', function() {
    it('should return 400', function(done) {
      request
        .post(host + '/register')
        .send('username=invalidParameter')
        .send('password=invalidParameter')
        .end(function(res) {
          assert.strictEqual(res.status, 400);
          done();
        });
    });
  });
});
