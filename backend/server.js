// Importamos dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializamos express
const app = express();

//  para permitir peticiones desde tu frontend
app.use(cors());
app.use(express.json());

// Conectamos con MongoDB Atlas
mongoose.connect('mongodb+srv://mariana12345vg_db_user:4CzBQommwT8wc7uB@libreriajuegos.fh6n5c4.mongodb.net/?retryWrites=true&w=majority&appName=libreriajuegos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' Conectado a MongoDB Atlas'))
.catch(err => console.error(' Error al conectar con MongoDB:', err));

// Esquema y modelo del juego
const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  genre: String
});
const Game = mongoose.model('Game', gameSchema);

// Esquema y modelo de reseñas
const reviewSchema = new mongoose.Schema({
  juegoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  puntuacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  textoReseña: {
    type: String,
    required: true
  },
  horasJugadas: {
    type: Number,
    required: true
  },
  dificultad: {
    type: String,
    enum: ["Fácil", "Normal", "Difícil"],
    required: true
  },
  recomendaria: {
    type: Boolean,
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ');
});

// Ruta para obtener todos los juegos
app.get('/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
});
app.get('/api/juegos/:id', async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el juego' });
  }
});

// Ruta para agregar un juego
app.post('/games', async (req, res) => {
  const { name, description, genre } = req.body;
  try {
    const newGame = new Game({ name, description, genre });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el juego' });
  }
});
app.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, genre } = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { name, description, genre },
      { new: true }
    );
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el juego' });
  }
});
app.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Game.findByIdAndDelete(id);
    res.json({ message: 'Juego eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el juego' });
  }
});

// Ruta para obtener todas las reseñas
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().populate('juegoId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
});
app.get('/api/reseñas/juego/:juegoId', async (req, res) => {
  try {
    const reseñas = await Reseña.find({ juegoId: req.params.juegoId });
    res.json(reseñas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las reseñas del juego' });
  }
});

// Ruta para agregar una reseña
app.post('/reviews', async (req, res) => {
  const { juegoId, puntuacion, textoReseña, horasJugadas, dificultad, recomendaria } = req.body;
  try {
    const nuevaReseña = new Review({
      juegoId,
      puntuacion,
      textoReseña,
      horasJugadas,
      dificultad,
      recomendaria
    });
    await nuevaReseña.save();
    res.status(201).json(nuevaReseña);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la reseña' });
  }
});

app.put('/api/reseñas/:id', async (req, res) => {
  const { puntuacion, textoReseña, horasJugadas, dificultad, recomendaria } = req.body;
  try {
    const reseñaActualizada = await Reseña.findByIdAndUpdate(
      req.params.id,
      { puntuacion, textoReseña, horasJugadas, dificultad, recomendaria, fechaActualizacion: Date.now() },
      { new: true }
    );
    if (!reseñaActualizada) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json(reseñaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reseña' });
  }
});
app.delete('/api/reseñas/:id', async (req, res) => {
  try {
    const reseñaEliminada = await Reseña.findByIdAndDelete(req.params.id);
    if (!reseñaEliminada) return res.status(404).json({ error: 'Reseña no encontrada' });
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reseña' });
  }
});


// Puerto del backend
const PORT = 4000;
app.listen(PORT, () => console.log(`si Servidor corriendo en http://localhost:${PORT}`));
