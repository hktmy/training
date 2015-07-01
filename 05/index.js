import index from './src/index.js';

console.log('Starting Server...');
index.app.listen(3000, () => {
  console.log('Account Server Listening');
});
