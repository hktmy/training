var index = require('./src/index.js');

console.log('Starting Server...');
index.app.listen(3000, function() {
  console.log('Account Server Listening');
});
