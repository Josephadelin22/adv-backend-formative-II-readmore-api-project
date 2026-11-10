const Author = require('../models/authorModel');

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

exports.gerAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({
            success: true,
            count
        })
    }
}