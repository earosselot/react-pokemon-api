import { useState, useEffect } from "react";
import './App.css';
import PokeList from "./components/PokeList";

function App() {

  const [showTable, setShowTable] = useState(false);

  return (
    <div className="App">
      <h1>Pokemons React</h1>
      <button onClick={() => setShowTable(!showTable)}>{showTable ? 'Hide Table' : 'Show Table'}</button>
      {showTable && <PokeList/>}
    </div>
  );
}

export default App;
