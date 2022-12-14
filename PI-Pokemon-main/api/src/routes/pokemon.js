const { Router } = require('express');
const { Pokemon, Tipo} = require('../db');
const { default: axios } = require("axios");
const { getPokeApi } = require('./getPokeApi');

const router = Router();

router.get('/', async (req, res, next) => {
  
  try {
    let getApi = await getPokeApi();
    let pokemonDb = Pokemon.findAll({
      includes: Tipo
    })
    
    }
  catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    let pokemons
    if (typeof id === 'string' && id.length > 8) {
      pokemons = await Pokemon.findByPk(id)
      res.send(pokemons);
    } else {
      respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      pokemons = respuesta.data
      let pokeArray = []
      pokeArray.push(pokemons);
      pokeArray = pokeArray.map(pokemon => {
        return {
          imagen: pokemon.sprites.front_default,
          name: pokemon.name,
          type: pokemon.types['0'].type.name,
          //type2: pokemon.types['1'].type.name,
          id: pokemon.id,
          vida: pokemon.base_experience,
          ataque: pokemon.stats['0'].base_stat,
          altura: pokemon.height,
          peso: pokemon.weight
        }
      })
      res.send(pokeArray);
    }
    res.send(pokemons);
  } catch (error) {
    next(error);
  }
});

/* router.get(`/`, (req, res, next) => {
  const name = req.query.name
  try {
    if (name) {
      //let pokemonApi = axios.get(`https://pokeapi.co/api/v2/pokemon?name=${name}`);
      let pokemonDb = Pokemon.findAll({
        includes: Tipo,
        where: {
          name: name
        }
      });
      res.send(pokemonDb);
    } else {
      res.send(`El nombre ${name}, no pertenece a un Pokemon existente`);
    }
    
  } catch (error) {
        next(error);
  }
}); */

router.post('/', async (req, res, next) => {
  try {
    const { id, name, vida, ataque, defensa, velocidad, altura, peso } = req.body;
    const newPokemon = await Pokemon.create(req.body);
    res.json(newPokemon); 
  } catch (error) {
        next(error);
  }
});



module.exports = router;