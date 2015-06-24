
var fs = require('fs');

function read(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, { encoding: 'utf-8' }, function(err, result) {
      if (err) {
        return reject(err);
      }
      result = result.replace('\n', '');
      resolve(result);
    });
  });
}


var readPromises = ['a', 'b', 'c', 'd'].map(function(e) {
  return e + '.txt';
}).map(function(filename) {
  return read(filename);
});

Promise.all(readPromises).then(function(result) {
  console.log(result);
}).catch(function(err) {
  return console.log(err);
});

// var fs = require('fs');
// 
// unction read(filename) {
//  return new Promise(function(resolve, reject) {
//    fs.readFile(filename, { encoding: 'utf-8' }, function(err, result) {
//      if (err) {
//        return reject(err);
//      }
//      result = result.replace('\n', '');
//      resolve(result);
//    });
//  });
// 
// 
// ead('a.txt').then(function(result) {
//  console.log(result);
//  return read(result);
// ).then(function(result) {
//  console.log(result);
//  return read(result);
// ).then(function(result) {
//  console.log(result);
//  return read(result);
// ).then(function(result) {
//  console.log(result);
// ).catch(function(err) {
//  console.log(err);
// );
// 
// fs.readFile('a.txt', { encoding: 'utf-8' }, function(err, result) {
//  if (err) {
//    return console.log(err);
//  }
//  console.log(result);
//  fs.readFile(result.split('\n')[0], { encoding: 'utf-8' }, function(err, result) {
//    if (err) {
//      return console.log(err);
//    }
//    console.log(result);
//    fs.readFile(result.split('\n')[0], { encoding: 'utf-8' }, function(err, result) {
//      if (err) {
//        return console.log(err);
//      }
//      console.log(result);
//      fs.readFile(result.split('\n')[0], { encoding: 'utf-8' }, function(err, result) {
//        if (err) {
//          return console.log(err);
//        }
//        console.log(result);
//      });
//    });
//  });
// );
