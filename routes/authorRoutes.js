const express = require('express');
const router = express.Router();
const {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorControllers');

const { getBooksByAuthorId } = require('../controllers/bookController');

// Routes pour /authors
router.route('/')
    .post(createAuthor) // Créer un nouvel auteur
    .get(getAllAuthors); // Récupérer tous les auteurs
    
// Routes pour /authors/:id
router.route('/:id')
    .get(getAuthorById) // Récupérer un auteur par ID
    .put(updateAuthor) // Mettre à jour un auteur par ID
    .delete(deleteAuthor); // Supprimer un auteur par ID

router.get('/:id/books', getBooksByAuthorId);

module.exports = router;