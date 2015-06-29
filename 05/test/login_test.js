var assert = require('assert');
var request = require('superagent');
var config = require('./config/config.json');
var host = config.host;

describe('GET /login', function() {
  it('should return 200', function(done) {
    request
      .get(host + '/login')
      .end(function(err, res) {
        if (err) {
          done(err);
        }
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});

describe('POST /login', function() {
  context('valid parameter', function() {
    it('should return 200', function(done) {
      request
        .post(host + '/login')
        .send('username=soneda')
        .send('password=aaaaaa')
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
    it('should return 401', function(done) {
      request
        .post(host + '/login')
        .send('username=invalid')
        .send('password=invalid')
        .end(function(res) {
          assert.strictEqual(res.status, 401);
          done();
        });
    });
  });
});
