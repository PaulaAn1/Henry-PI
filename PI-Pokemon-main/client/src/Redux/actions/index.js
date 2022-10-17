import axios from 'axios';
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON = "GET_POKEMON";
export const DELETE_POKEMON = "Delete_Pokemon";



export const getAllPokemons = () => {
  return function (dispatch) {
    return (
      axios.get('http://localhost:3001/api/pokemon/')
        .then(pokemons => {
          dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons.data
        })
        })
        .catch(err => {
        console.log(err);
      })
    )
  }
}
/* console.log(getAllPokemons); */