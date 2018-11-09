const express = require('express');
var router = express.Router();
const views = require('../views');


router.get('/', (req, res, next) => {
  res.send('got to GET /WIKI');
})


router.post('/', (req, res, next) => {
  res.send('got to POST /WIKI');
})


router.get('/add', (req, res, next) => {
  res.send(views.addPage());
})


module.exports = router;
