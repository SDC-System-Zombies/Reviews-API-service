const controller = require('./controllers/psql');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello, you are connecting to SDC API ');
});

router.get('/loaderio-9fa1fb9f7a2da64d23c45d4944fc2a2c/', (req, res) => {
  res.send('loaderio-9fa1fb9f7a2da64d23c45d4944fc2a2c');
});

router.get('/reviews', controller.get);

router.get('/reviews/meta', controller.getMeta);

router.post('/reviews', controller.post);

router.put('/reviews/:review_id/helpful', controller.put);

router.put('/reviews/:review_id/report', controller.put);

module.exports = router;