const express = require('express');
const router = express.Router();
const redis = require('../redis');
const configs = require('../util/config');
const { getCounter } = require('../redis/counter');

let visits = 0


/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistic', async (req, res, next) => {
  try{
  const count = await getCounter();

  res.json({
    added_todos: count });
} catch (error) {
  next(error);
}
});
module.exports = router;
