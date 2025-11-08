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

  // Mostrar la descripción
  nuevoJuego.describe();

  // Guardar en la base de datos
  await nuevoJuego.save();
  console.log("🎮 Juego guardado exitosamente en MongoDB");

  mongoose.connection.close();
}

main().catch(err => console.error(err));
