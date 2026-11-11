const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
} = require('../controllers/bookController');

// Routes pour /books
router.route('/')
    .post(createBook) // Créer un nouveau livre
    .get(getAllBooks); // Récupérer tous les livres

// Routes pour /books/:id
router.route('/:id')
    .get(getBookById) // Récupérer un livre par ID
    .put(updateBookById) // Mettre à jour un livre par ID
    .delete(deleteBookById); // Supprimer un livre par ID

module.exports = router;