const { Router } = require('express');
const { Pokemon } = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
    try {
      let pokemones = Pokemon.findAll()
      res.status(201).json(pokemones);
    } catch (error) {
      res.status(404).json({ error });
    }
});

router.get(`/:id`, (req, res, next) => {
  const { id } = req.params;
  let findPokemon = Pokemon.findByPk(id);

  if (!findPokemon) return res.status(404).send(`El Pokemon Id ${id} no existe`);

  return res.json(findPokemon);
});

router.get('/', (req, res, next) => {
  const { name } = req.query;
  const pokemon = Pokemon.findByPk(name);

  if (!pokemon) return res.status(404).send(`El nombre ${name} no corresponde a un Pokemon`);

  return res.json(pokemon);

});

router.post('/', async (req, res, next) => {
  const { id, name, vida, ataque, defensa, velocidad, altura, peso } = req.body;
  const newPokemon = await Pokemon.create(req.body);
  res.json(newPokemon);
});


module.exports = router;