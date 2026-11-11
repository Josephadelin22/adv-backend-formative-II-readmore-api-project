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
    }
};


// get all books with author details

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author');
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