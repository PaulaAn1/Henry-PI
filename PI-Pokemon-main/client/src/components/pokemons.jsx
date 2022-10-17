import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../Redux/actions';
import { Pokemon } from './pokemon';
const Pokemons = () => {
  let pokemons = useSelector((state) => state.pokemons);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPokemons())
  }, [])
  
  console.log(pokemons);
  return <div>
    {pokemons.map(pokemon => {
      return <Pokemon
        name={pokemon.name}
        id={pokemon.id}
      />
    })}
  </div>
} 

export default Pokemons;