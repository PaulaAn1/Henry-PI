import { useSelector } from 'react-redux';
const Pokemons = () => {
  let pokemons = useSelector((state) => state.pokemons);
  console.log(pokemons);
  return <div>Soy POKE</div>
}

export default Pokemons;