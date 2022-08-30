const { Router } = require('express');
const pokemonRoute = require('./pokemon');
const tipoRoute = require('./tipo');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', pokemonRoute);
router.use('/tipo', tipoRoute);

module.exports = router;
