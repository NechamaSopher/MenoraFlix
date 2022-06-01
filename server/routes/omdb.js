const express = require('express');
const { getMovies } = require('../controllers/omdb.js');

const router = express.Router();

router.get('/movies', getMovies);

module.exports = router;
