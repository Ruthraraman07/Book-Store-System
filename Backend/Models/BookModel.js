const mongoose = require("mongoose"); // Import mongoose

// Define the Book schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true // Title is required
    },
    author: {
        type: String,
        required: true // Author is required
    },
    genre: {
        type: String // Genre is optional
    },
    yearPublished: {
        type: String // Year published is optional
        
    },
    cover: {
        type: String // Filename of uploaded cover image
    }
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

module.exports = mongoose.model("Book", BookSchema); // Export the Book model
