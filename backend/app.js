const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3001
app.use(express.json());

const uri = "mongodb+srv://mariana12345vg_db_user:4CzBQommwT8wc7uB@libreriajuegos.fh6n5c4.mongodb.net/?retryWrites=true&w=majority&appName=libreriajuegos";
mongoose.connect(uri)
.then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));
