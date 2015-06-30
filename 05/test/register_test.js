var assert = require('assert');
var request = require('superagent');
var config = require('./config/config.json');
var host = config.host;
var DB = require('./helper').DB;
var dbConfig = require('../config/config');
var db = new DB(dbConfig.db.mysql);

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
  before(function(done) {
    db.connect()
      .then(function() {
        return db.clear();
      }).then(function() {
        done();
      }).catch(function(err) {
        done(err);
      });
  });

  afterEach(function(done) {
    db.clear()
      .then(function() {
        done();
      }).catch(function(err) {
        done(err);
      });
  });

  context('valid parameter', function() {
    it('should return 200', function(done) {
      request
        .post(host + '/register')
        .send('username=testuser')
        .send('password=testuser')
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

  context('already exist username', function() {
    before(function(done) {
      db.create({ username: 'testuser', password: 'testuser' })
        .then(function() {
          done();
        }).catch(function(err) {
          done(err);
        });
    });

    after(function(done) {
      db.clear()
        .then(function() {
          done();
        }).catch(function(err) {
          done(err);
        });
    });

    it('should return 401', function(done) {
      request
        .post(host + '/register')
        .send('username=testuser')
        .send('password=testuser')
        .end(function(res) {
          assert.strictEqual(res.status, 401);
          done();
        });
    });
  });
});
