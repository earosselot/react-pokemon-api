import React from 'react';
import {useState} from 'react'

const PokeItem = ({ name, url }) => {

  const [data, setData] = useState({
    img: '',
    type: '',
  });
  const [showData, setShowData] = useState(false);

  async function getPokemon(pokemonUrl) {
    const response = await fetch(pokemonUrl)
    const data = await response.json()
    const types = data.types.map(type => type.type.name)
    const typesString = types.join(', ')
    const newData = {
      img: data.sprites.front_default,
      type: typesString,
    }
    setData(newData)
    setShowData(!showData)
  }

  const pokeDescription =
    <div className='pokemon-description'>
      {data.img && <img src={data.img} alt={`pokemon-${data.name}`}/>}
      {data.type && `types: ${data.type}`}
    </div>

  function handleClick() {
    if (!data.img) {
      getPokemon(url)
    } else {
      setShowData(!showData)
    }
  }

  return (
    <li
      onClick={handleClick}>
      {name}
      {showData && pokeDescription}
    </li>
  );
};

export default PokeItem
