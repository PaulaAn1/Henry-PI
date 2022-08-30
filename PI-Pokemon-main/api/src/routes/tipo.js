const { Router } = require('express');
const { Tipo } = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
  console.log('Hola soy post en tipo');
})

module.exports = router;