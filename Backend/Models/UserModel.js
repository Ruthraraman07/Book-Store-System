const mongoose = require("mongoose"); // Import mongoose

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Email must be unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt

module.exports = mongoose.model("User", UserSchema); // Export the User model without trailing space
