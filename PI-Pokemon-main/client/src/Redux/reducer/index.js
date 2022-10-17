import { CREATE_POKEMON, DELETE_POKEMON, GET_ALL_POKEMONS, GET_POKEMON, } from "../actions";

const initialState = {
  pokemons: [],
  pokemonFiltered: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload
      }
    default:
      return state
  }
}

export default rootReducer;