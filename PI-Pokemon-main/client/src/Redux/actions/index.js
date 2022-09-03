export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON = "GET_POKEMON";
export const DELETE_POKEMON = "Delete_Pokemon";
import axios from 'axios';


const getAllPokemons = () => {
  return function (dispatch) {
    return (
      axios.get('http://localhost:3001/api/pokemon/')
        .then(pokemon => {
          dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemon  
        })
      })
    )
  }
}