import {useEffect, useState} from 'react';
import PokeItem from "./PokeItem";

const INITIAL_DATA = {
  pokemons: [],
  nextPokemons: '',
  prevPokemons: '',
  count: 0
}

const PokeList = () => {
  const [data, setData] = useState(INITIAL_DATA);

  async function getPokemons(url) {
    let response = await fetch(url)
    let data = await response.json()
    const newData = {
      pokemons: data.results,
      nextPokemons: data.next,
      prevPokemons: data.previous,
      count: data.count
    }
    setData(newData)
  }

  useEffect(() => {
    getPokemons('https://pokeapi.co/api/v2/pokemon')
  }, []);

  const startPokemonNumber = getFirstPokemonNumber(data.pokemons)

  return (
    <div>
      <h3>Pokemons List</h3>
      <ol start={startPokemonNumber}>
        {data.pokemons.map( pokemon => (
          <PokeItem key={pokemon.url} name={pokemon.name} url={pokemon.url}/>
        ))}
      </ol>
      <button
        disabled={!data.prevPokemons}
        onClick={() => getPokemons('https://pokeapi.co/api/v2/pokemon')}>
        First Page
      </button>
      <button
        disabled={!data.prevPokemons}
        onClick={() => getPokemons(data.prevPokemons)}>
        Prev
      </button>
      <button
        disabled={!data.nextPokemons}
        onClick={() => getPokemons(data.nextPokemons)}>
        Next
      </button>
      <button
        disabled={!data.nextPokemons}
        onClick={() =>
          getPokemons(
            `https://pokeapi.co/api/v2/pokemon/?offset=${data.count-(data.count % 20)}&limit=${data.count % 20}`)}>
        Last Page
      </button>
    </div>
  );
};

export default PokeList


function getFirstPokemonNumber(pokemons) {
  return pokemons[0]?.url.split('/')[6]
}
