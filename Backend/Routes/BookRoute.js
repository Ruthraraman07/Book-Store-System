const express = require('express'); // Import the Express framework so we can create routes for our server
const router = express.Router();  // Create a router define book-related routes separately

const multer = require('multer'); //middleware for handling file uploads (like book cover images)
const path = require('path'); // 'path' module  helps work with file and folder paths in a safe way


// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Store files in uploads/
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
});
const upload = multer({ storage }); // Create multer instance

const {
    createBook,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook,
    filterBooksByAuthor
} = require("../Controllers/BookController"); // Import book controller functions

// Define routes for book operations
router.post('/', upload.single('cover'), createBook); // Create a new book
router.get('/', getBooks); // Get all books
router.get("/filter", filterBooksByAuthor); // Filter books by year published

// Add update and delete routes
router.patch('/:id', upload.single('cover'), updateBook); // Update a book by ID
router.delete('/:id', deleteBook); // Delete a book by ID

module.exports = router; // Export the router
