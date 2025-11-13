const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Obtener todas las reseñas
router.get('/', async (req, res) => {
  const reviews = await Review.find().populate('juegoId');
  res.json(reviews);
});

// Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const nuevaReseña = new Review(req.body);
    await nuevaReseña.save();
    res.status(201).json(nuevaReseña);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
