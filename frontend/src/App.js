
import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/games")

      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Error al cargar juegos:", err));
  }, []);

  return (
    <div className="app">
      <h1>🎮 Librería de Juegos</h1>
      <div className="games-container">
        {games.map((game) => (
          <div className="game-card" key={game._id}>
            <img src={game.imagenPortada} alt={game.titulo} />
            <h2>{game.titulo}</h2>
            <p><strong>Género:</strong> {game.genero}</p>
            <p><strong>Plataforma:</strong> {game.plataforma}</p>
            <p><strong>Año:</strong> {game.añoLanzamiento}</p>
            <p>{game.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
