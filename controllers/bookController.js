const Author = require('../models/Author');
const Book = require('../models/Book');

// Create a new book

exports.createBook = async (req, res) => {
    try {
        const { title, genre, price, publishedYear, author: authorId } = req.body;

        const authorExists = await Author.findById(authorId);
        if (!authorExists) {
            return res.status(404).json({
                success: false,
                message: 'Author not found with this ID'
            });
        }

        const existingBook = await Book.findOne({
            author: authorId,
            title: {$regex: new RegExp(`^${title}$`, 'i')}
        });
        if (existingBook) {
            return res.status(409).json({
                success: false,
                message: 'A book with this title already exists for this author'
            });
        }

        if (price <= 0) {
            return res.status(422).json({
                success: false,
                message: 'Price must be greater than zero.'
            });
        }

        const currentYear = new Date().getFullYear();
        if (publishedYear < 1450 || publishedYear > currentYear) {
            return res.status(422).json({
                success: false,
                message: `Published year must be between 1450 and ${currentYear}.`
            });
        }

        const populatedBook = await book.populate('author');
        
        const book = await Book.create(req.body);
        res.status(201).json({
            success: true,
            data: populatedBook
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// get all books with author details

exports.getAllBooks = async (req, res) => {
    try {
        const { genre, minPrice, maxPrice, author, search, sort, order, page = 1, limit = 10 } = req.query;
        
        // Objet de requête dynamique pour Mongoose
        const queryObj = {};

        // 1. Filtrer par genre (insensible à la casse)
        if (genre) {
            queryObj.genre = { $regex: new RegExp(genre, 'i') };
        }

        // 2. Filtrer par plage de prix (min / max)
        if (minPrice || maxPrice) {
            queryObj.price = {};
            if (minPrice) queryObj.price.$gte = Number(minPrice);
            if (maxPrice) queryObj.price.$lte = Number(maxPrice);
        }

        // 3. Filtrer par ID d'auteur
        if (author) {
            queryObj.author = author;
        }

        // 4. Recherche textuelle dans le titre (insensible à la casse)
        if (search) {
            queryObj.title = { $regex: search, $options: 'i' };
        }

        // Pagination : calcul du skip
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Construction de la requête Mongoose de base
        let query = Book.find(queryObj).populate('author');

        // 5. Tri (sort + order)
        if (sort) {
            const sortOrder = order === 'desc' ? -1 : 1;
            query = query.sort({ [sort]: sortOrder });
        }

        // Application de la pagination
        query = query.skip(skip).limit(limitNum);

        const books = await query;
        const total = await Book.countDocuments(queryObj);

        res.status(200).json({
            success: true,
            page: pageNum,
            limit: limitNum,
            total: total,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// get a single book by ID with author details

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found with this ID'
            });
        }
        res.status(200).json({
            success: true,
            data: book
        });         
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// get a book by Id with the author

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found with this ID'
            });
        }
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });     
    }
};

exports.getBooksByAuthorId = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: 'Author not found'
            });
        }

        const books = await Book.find({ author: author._id }).populate('author');
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// Update a book by ID

exports.updateBookById = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('author');

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found with this ID'
            });
        }

        res.status(200).json({
            success: true,
            data: book
        }); 
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


// delete a book 

exports.deleteBookById = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found with this ID'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};  