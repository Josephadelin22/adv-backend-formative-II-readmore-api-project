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

// 5. Delete an author by ID

exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);

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
            