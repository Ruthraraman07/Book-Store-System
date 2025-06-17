
import React from "react";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { motion } from "framer-motion"; // Import motion from framer-motion
import axios from "axios";

const placeholderImage = "/placeholder.jpg";

const BookItem = ({ book, setEditingBook, setBooks }) => {
  const { _id, title, author, genre, yearPublished, cover } = book;

  const handleDelete = async () => {
    if (window.confirm("Delete this book?")) {
      try {
        await axios.delete(`/api/books/${_id}`);
        setBooks((prev) => prev.filter((b) => b._id !== _id));
      } catch (error) {
        alert("Failed to delete the book");
      }
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = placeholderImage;
    console.warn(`Failed to load image for book: ${title}`);
  };

  const coverImageUrl = cover ? `http://localhost:4000/${cover}` : placeholderImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: 10 }} // Animate out
      transition={{ duration: 0.5 }} // Increased duration for the main item
    >
      <Card elevation={Elevation.ONE} className="book-item">
        <div className="book-details">
          <img
            src={coverImageUrl}
            alt={title}
            onError={handleImageError}
            className="book-cover"
          />

          <div className="book-actions">
            <h3>{title}</h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }} // Initial state for author
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              exit={{ opacity: 0, y: 10 }} // Animate out
              transition={{ duration: 0.5, delay: 0.1 }} // Increased duration and delay for author
            >
              <strong>Author:</strong> {author}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }} // Initial state for genre
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              exit={{ opacity: 0, y: 10 }} // Animate out
              transition={{ duration: 0.5, delay: 0.2 }} // Increased duration and delay for genre
            >
              <strong>Genre:</strong> {genre}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }} // Initial state for yearPublished
              animate={{ opacity: 1, y: 0 }} // Animate to this state
              exit={{ opacity: 0, y: 10 }} // Animate out
              transition={{ duration: 0.5, delay: 0.3 }} // Increased duration and delay for year
            >
              <strong>Year:</strong> {yearPublished}
            </motion.p>

            <Button icon="edit" onClick={() => setEditingBook(book)} />
            <Button icon="trash" onClick={handleDelete} intent="danger" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BookItem;
