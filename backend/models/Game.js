const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    required: true,
    trim: true
  },
  plataforma: {
    type: String,
    required: true,
    trim: true
  },
  añoLanzamiento: {
    type: Number,
    required: true
  },
  desarrollador: {
    type: String,
    required: true,
    trim: true
  },
  imagenPortada: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  completado: {
    type: Boolean,
    default: false
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});
gameSchema.methods.describe= function (){
  console.log (`${this.titulo} es un juego de ${this.genero} disponible en ${this.plataforma}.`);
}

module.exports = mongoose.model('Game', gameSchema);