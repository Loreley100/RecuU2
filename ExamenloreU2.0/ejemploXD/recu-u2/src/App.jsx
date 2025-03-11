import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    setError(null); // Reinicia el error antes de cada solicitud
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => {
        setPokemon(response.data.results);
      })
      .catch(() => {
        setError("Error al cargar los datos. Inténtalo de nuevo.");
      });
  }, [offset]);

  return (
    <div className="App">
      <h1>Pokémon</h1>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {pokemon.map((poke, index) => {
            const pokemonId = offset + index + 1;
            return (
              <li key={poke.name}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                  alt={poke.name}
                />
                <p>{poke.name}</p>
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <button onClick={() => offset > 0 && setOffset(offset - limit)} disabled={offset === 0}>
          Atrás
        </button>
        <button onClick={() => setOffset(offset + limit)}>Adelante</button>
      </div>
    </div>
  );
}

export default App;