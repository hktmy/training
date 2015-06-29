var assert = require('assert');
var request = require('superagent');
var config = require('./config/config.json');
var host = config.host;

describe('GET /', function() {
  it('should return 200', function(done) {
    request
      .get(host + '/')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 200);
        done();
      });
  });
});
