const { Router, response } = require('express');
const { Pokemon, Tipo} = require('../db');
const router = Router();
const axios = require('axios');


router.get('/', async (req, res, next) => {
  try {
    let pokemonApi = await axios.get('https://pokeapi.co/api/v2/pokemon');
    let pokeApiDos = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20');
    let pokemonDb = Pokemon.findAll({
        includes: Tipo
    })
    Promise.all([
      pokemonApi,
      pokeApiDos,
      pokemonDb
    ])
      .then( async (respuesta) => {
        const [pokemonApi, pokeApiDos, pokemonDb] = respuesta;
        let filterPokemon = pokemonApi.data.results
        let filterPokeDos = pokeApiDos.data.results
        
        filterPokemon = filterPokemon.map((pokemon) => {
          /* let dataUrl = await axios.get(pokemon.url)
          dataUrl = dataUrl.data
          let arrayPoke = []
          arrayPoke.push(dataUrl);
          arrayPoke = arrayPoke.map(poke => {
            return {
              name: poke.name,
              image: poke.sprites.front_default,
              type: poke.types['0'].type.name
            }
          })
          console.log(arrayPoke); */
          return {
            name: pokemon.name,
          }   
        })
        filterPokeDos = filterPokeDos.map((pokemon) => {
          return {
            name: pokemon.name
          }   
        })
        /* console.log(filterPokeDos); */

        let allPokemons = [...filterPokemon, ...filterPokeDos, ...pokemonDb];
        res.send(allPokemons);

    })
    
  } catch (error) {
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