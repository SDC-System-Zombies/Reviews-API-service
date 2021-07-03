require('newrelic');
const controller = require('./controllers/psql');
// Set up with express

// const express = require('express');
// // const morgan = require('morgan');
// const router = require('./routes.js');
const PORT = process.env.PORT || 3000;
// let app = express();

// // app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

// app.use('/', router);

// app.listen(PORT, function() {
//   console.log(`listening on PORT ${PORT}`);
// });

// Set up with fastify

const fastify = require('fastify')({ logger: true })


fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  try {
    var json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
});


// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/loaderio-1e702b6d033d7f9dc152599df07e24af', async (request, reply) => {
  reply.send('loaderio-1e702b6d033d7f9dc152599df07e24af');
})

fastify.get('/reviews', controller.get);

// Run the server!
fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})