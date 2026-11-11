const express = require('express');
const router = express.Router();
const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAuthorStats 
} = require('../controllers/authorController');

const { getBooksByAuthor } = require('../controllers/bookController');

// 1. Route spécifique pour les statistiques d'un auteur (AVANT /:id)
router.get('/:id/stats', getAuthorStats);

// 2. Route pour récupérer les livres d'un auteur spécifique
router.get('/:id/books', getBooksByAuthor);

// 3. Routes CRUD de base
router.route('/')
  .post(createAuthor)
  .get(getAllAuthors);

router.route('/:id')
  .get(getAuthorById)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = router;