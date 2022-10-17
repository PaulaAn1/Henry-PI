const { default: axios } = require("axios");


const getPokeApi = async () => {
  try {
    let poke = await Promise.all([
      axios.get('https://pokeapi.co/api/v2/pokemon'),
      axios.get('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20') 
    ])
    const datos1 = poke[0].data.results
    const datos2 = poke[1].data.results
    poke = datos1.concat(datos2);

    poke = poke.map(pokemon => pokemon.url) 
    return poke;

  } catch (err) {
    console.error(err)
  }
}



module.exports = { getPokeApi };


