const mongoose = require("mongoose");
const Book = require("../Models/BookModel"); // Import the Book model
const fs = require("fs"); // File system module for file operations
const path = require("path"); // Path module for handling file paths

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}); // Fetch all books from the database
    res.status(200).json(books); // Send books as response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Get a single book by ID
const getSingleBook = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID" }); // Validate ID
  }

  try {
    const book = await Book.findById(id); // Fetch book by ID
    if (!book) return res.status(404).json({ error: "Book not found" }); // Handle not found
    res.status(200).json(book); // Send book as response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Create a new book (optionally with cover image)
const createBook = async (req, res) => {
  const { title, author, genre, yearPublished } = req.body; // Extract book details from request body
  const cover = req.file ? `uploads/${req.file.filename}` : undefined; // Handle cover image

  try {
    const newBook = await Book.create({ title, author, genre, yearPublished, cover }); // Create new book
    req.io.emit("bookCreated", newBook); // Emit event for new book
    res.status(201).json(newBook); // Send created book as response
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
};

// Update an existing book (optionally with new cover image)
const updateBook = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID" }); // Validate ID
  }

  const updatedData = { ...req.body }; // Prepare updated data
  if (req.file) {
    updatedData.cover = `uploads/${req.file.filename}`; // Handle new cover image
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true }); // Update book
    if (!updatedBook) return res.status(404).json({ error: "Book not found" }); // Handle not found

    req.io.emit("bookUpdated", updatedBook); // Emit event for updated book
    res.status(200).json(updatedBook); // Send updated book as response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

// Delete a book by ID and remove cover image from filesystem
const deleteBook = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid book ID" }); // Validate ID
  }

  try {
    const book = await Book.findById(id); // Fetch book by ID
    if (!book) return res.status(404).json({ error: "Book not found" }); // Handle not found

    // Remove cover image file if it exists
    if (book.cover) {
      const imagePath = path.join(__dirname, "..", book.cover); // Construct image path
      fs.unlink(imagePath, (err) => { // Delete image file
        if (err) {
          console.error("Failed to delete cover image:", err); // Log error
        } else {
          console.log("Cover image deleted:", book.cover); // Log success
        }
      });
    }

    await Book.findByIdAndDelete(id); // Delete book from the database
    req.io.emit("bookDeleted", id); // Emit event for deleted book
    res.status(200).json({ msg: "Book deleted successfully" }); // Send success message
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
};

/**
 * Filter books by yearPublished
 */
const filterBooksByAuthor = async (req, res) => {
  const { author } = req.query;

  try {
    if (!author || author.trim() === "") {
      // If no author query provided, return all books or empty array
      const books = await Book.find({});
      return res.status(200).json(books);
    }
    const books = await Book.find({ author: new RegExp(author, "i") });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  filterBooksByAuthor,
}; // Export controller functions
