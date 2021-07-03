const redis = require('redis');
const client = redis.createClient({
    host: 'ec2-18-224-30-222.us-east-2.compute.amazonaws.com',
    port: 6379
});

client.on('error', err => {
    console.log('Error ' + err);
});

// module.exports = {
//   get: async (productId) => {
//     let re;
//     await client.get(productId, (err, reply) => {
//       if (err) {
//         console.log(err);
//       };
//       console.log('log1' + reply)
//       re = reply;
//     });
//     return re;
//   }
// }

// client.set('foo', 'bar', (err, reply) => {
//   if (err) throw err;
//   console.log(reply);

//   client.get('foo', (err, reply) => {
//       if (err) throw err;
//       console.log(reply);
//   });
// });

module.exports.client = client;