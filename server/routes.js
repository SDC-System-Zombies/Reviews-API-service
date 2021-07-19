const controller = require('./controllers/psql');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('SDC API ');
});

router.get('/loaderio-1f2972b5da89118bade968f1a4762141', (req, res) => {
  res.send('loaderio-1f2972b5da89118bade968f1a4762141');
});

router.get('/reviews', controller.get);

router.get('/reviews/meta', controller.getMeta);

router.post('/reviews', controller.post);

router.put('/reviews/:review_id/helpful', controller.put);

router.put('/reviews/:review_id/report', controller.put);

module.exports = router;