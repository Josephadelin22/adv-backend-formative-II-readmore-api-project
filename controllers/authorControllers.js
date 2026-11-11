const Author = require('../models/Author');

exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({
            success: true,
            data: author
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// 2. Get all authors

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({
            success: true,
            count: authors.length,
            data: authors
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


//3. Get a single author by ID

exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }
        res.status(200).json({
            success: true,
            data: author
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'invalid author ID'
            });
        }
    };

    // 4. Update an author by ID

exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        res.status(200).json({
            success: true,
            data: author
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// 5. Supprimer un auteur avec la règle métier des orphelins (Option A -> 409)
exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;

        // RÈGLE 4 : Vérifier si l'auteur a encore des livres
        const booksCount = await Book.countDocuments({ author: authorId });
        if (booksCount > 0) {
            return res.status(409).json({
                success: false,
                message: 'Cannot delete author because they still have associated books. Delete or reassign their books first.'
            });
        }

        const author = await Author.findByIdAndDelete(authorId);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Author deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid author ID'
        });
    }
};
            