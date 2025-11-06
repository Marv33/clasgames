const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3001
app.use(express.json());

const uri = "mongodb+srv://mariana12345vg_db_user:4CzBQommwT8wc7uB@libreriajuegos.fh6n5c4.mongodb.net/?retryWrites=true&w=majority&appName=libreriajuegos";
mongoose.connect(uri)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

const Kitten = require('./models/Kitten');

app.get('/api/juegos', async(req, res) => {

    //Leemos todos los gatos que hay en la base de datos
  const kittens = await Kitten.find();
  res.json(kittens);
})
app.get('/api/juegos/:id', async(req, res) => {
   const juegoId = req.params.id;
  const kitten = await Kitten.findById(juegoId);
  res.json(kitten);
})
app.post('/api/juegos/:id', (req, res) => {
  const idJuego = req.params.id;
  res.send(idJuego)
})
app.put('/api/juegos/', (req, res) => {
  res.send('goodbye world')
})
app.delete('/api/juegos/:id', (req, res) => {
  res.send('goodbye world')
})
app.get('/api/reseñas', (req, res) => {
  res.send('goodbye world')
})
app.get('/api/reseñas/juego/:juegoId', (req, res) => {
  res.send('goodbye world')
})
app.post('/api/reseñas', (req, res) => {
  res.send('goodbye world')
})
app.put('/api/reseñas/:id', (req, res) => {
  res.send('goodbye world')
})
app.delete('/api/reseñas/:id', (req, res) => {
  res.send('goodbye world')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
