const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema ({
  juegoId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Game',
     required: true,
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

module.exports = mongoose.model('Review', reviewSchema);

