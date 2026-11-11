require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
//middleware pour les données JSON
app.use(express.json());
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

//health check

app.get('/',(req, res) =>{
    res.status(200).json({
        message: 'API is running'
    });
});

// Port du serveur 

const PORT = process.env.PORT || 3000;

// Connexion à la base de données MongoDB

async function startServer() {
    if (!process.env.MONGODB_URI) {
        console.error('Missing MONGODB_URI. Add it to your .env file before starting the server.');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

startServer();
