var assert = require('assert');
var request = require('superagent');
var config = require('./config/config.json');
var host = config.host;
var DB = require('./helper').DB;
var dbConfig = require('../config/config');
var db = new DB(dbConfig.db.mysql);

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
    before(function(done) {
      db.create({ username: 'soneda', password: 'aaaaaa' })
        .then(function() {
          done();
        }).catch(function(err) {
          done(err);
        });
    });

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

// describe('GET /logout', function() {
//   before(function(done) {
//     db.connect()
//       .then(function() {
//         return db.clear();
//       }).then(function() {
//         db.create({ username: 'soneda', password: 'aaaaaa' });
//       }).then(function() {
//         request
//           .post(host + '/login')
//           .send('username=soneda')
//           .send('password=aaaaaa')
//           .end(function(err, res) {
//             if (err) {
//               return done(err);
//             }
//             console.log(res.header['set-cookie']);
//             done();
//           });
//       }).catch(function(err) {
//         done(err);
//       });
//   });
//
//   after(function(done) {
//     db.clear()
//       .then(function() {
//         done();
//       }).catch(function(err) {
//         done(err);
//       });
//   });
//
//
//   it('should return 200', function(done) {
//     request
//       .get(host + '/logout')
//       .end(function(res) {
//         assert.strictEqual(res.status, 200);
//         done();
//       });
//   });
// });
