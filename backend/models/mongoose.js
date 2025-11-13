// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  const uri = "mongodb+srv://mariana12345vg_db_user:4CzBQommwT8wc7uB@libreriajuegos.fh6n5c4.mongodb.net/?retryWrites=true&w=majority&appName=libreriajuegos";

  await mongoose.connect(uri);
  console.log(" Conexión exitosa a MongoDB");

  // Definir el esquema
  const gameSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    plataforma: { type: String, required: true },
    añoLanzamiento: { type: Number, required: true },
    desarrollador: { type: String, required: true },
    imagenPortada: { type: String, required: true },
    descripcion: { type: String, required: true },
    completado: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now }
  });

  // Método personalizado
  gameSchema.methods.describe = function () {
    console.log(`${this.titulo} es un juego de ${this.genero} disponible en ${this.plataforma}.`);
  };

  // Crear modelo
  const Game = mongoose.model('Game', gameSchema);

  // Crear y guardar un juego nuevo
  const nuevoJuego = new Game({
    titulo: 'Super Mario Bros',
    genero: 'Plataforma',
    plataforma: 'Nintendo Entertainment System',
    añoLanzamiento: 1983,
    desarrollador: 'Nintendo',
    imagenPortada: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Super_Mario_Bros._NES_cover.png/220px-Super_Mario_Bros._NES_cover.png',
    descripcion: 'Un clásico juego de plataformas donde Mario debe rescatar a la princesa Peach.'
  });
 const nuevoJuego2 = new Game({
    titulo: 'Pac-Man',
    genero: 'Arcade / Laberinto',
    plataforma: 'Arcade',
    añoLanzamiento: 1980,
    desarrollador: 'Namco (Tōru Iwatani)',
    imagenPortada: 'https://www.bbc.com/culture/article/20250730-how-pac-man-changed-gaming-and-the-world',
    descripcion: 'El objetivo es controlar a Pac-Man para que coma todos los puntos (Pac-Dots) en un laberinto, mientras evita a cuatro fantasmas de colores (Blinky, Pinky, Inky y Clyde). Al comer un "punto de energía" temporalmente puede comer a los fantasmas.'
  });
   const nuevoJuego3 = new Game({
    titulo: 'Tetris',
    genero: 'Puzle (Apilamiento)',
    plataforma: 'Electronika 60 (Computadora soviética)',
    añoLanzamiento: 1984,
    desarrollador: 'Alekséi Pázhitnov',
    imagenPortada: 'https://play.google.com/pc-store/games/details?id=com.n3twork.tetris&hl=es_CO',
    descripcion: 'Un juego de puzle donde el jugador debe rotar y mover piezas de diferentes formas (tetrominós) que caen, para crear líneas horizontales sólidas sin dejar espacios. Es famoso por su simplicidad y dificultad creciente.'
  });
  const nuevoJuego4 = new Game({
    titulo: 'Donkey Kong',
    genero: 'Plataformas',
    plataforma: 'Arcade',
    añoLanzamiento: 1981,
    desarrollador: 'Nintendo R&D1',
    imagenPortada: 'https://www.imdb.com/es-es/title/tt0176664/',
    descripcion: 'El jugador controla a "Jumpman" (más tarde conocido como Mario) con el objetivo de rescatar a la damisela en apuros, Pauline, de un gorila gigante, Donkey Kong, que le lanza barriles. Es uno de los primeros juegos de plataformas.'
  });
 
  // Mostrar la descripción
  nuevoJuego.describe();
  nuevoJuego2.describe();
  nuevoJuego3.describe();
  nuevoJuego4.describe();

  // Guardar en la base de datos
  await nuevoJuego.save();
   await nuevoJuego2.save();
  await nuevoJuego3.save();
  await nuevoJuego4.save();
 
  console.log(" Juego guardado exitosamente en MongoDB");

  mongoose.connection.close();
}

main().catch(err => console.error(err));
