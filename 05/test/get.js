var assert = require('assert');
var route = require('../src/index.js');
var request = require('superagent');

request
.get('http://localhost:3000')
.end(function (err, res) {
  console.log(res.status); 
});

