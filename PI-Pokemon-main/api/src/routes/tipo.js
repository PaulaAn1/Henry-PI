const { Router } = require('express');
const { Tipo } = require('../db');
const router = Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  try {
    let pokemonApi = axios.get('https://pokeapi.co/api/v2/type/');
    let pokemonDb = Tipo.findAll()
    Promise.all([
      pokemonApi,
      pokemonDb
    ])
      .then((respuesta) => {
        const [pokemonApi, pokemonDb] = respuesta;
        let filterPokemon = pokemonApi.data.results
        filterPokemon = filterPokemon.map((type) => {
          return {
            name: type.name,
          }   
        })
        let allPokemons = [...filterPokemon, ...pokemonDb];
        res.send(allPokemons);
    })
    
  } catch (error) {
        next(error);
  }
})

module.exports = router;