const express = require("express"); // Import the express module
require('dotenv').config(); // Load environment variables from a '.env' file
const mongoose = require('mongoose'); // MongoDB object modeling tool
const cors = require('cors'); // Middleware for enabling CORS
const http = require('http'); // Core Node module to create the server
const { Server } = require("socket.io"); // Enables real-time communication with WebSockets
const bookRoutes = require('./Routes/BookRoute'); // Import book-related routes
const authRoutes = require('./Routes/AuthRoute'); // Import authentication-related routes

const app = express(); // Create an instance of an express application
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["POST", "GET", "PATCH", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow credentials
  }
});

// Attach socket instance to every request
app.use((req, res, next) => {
  req.io = io; // Make the socket instance available in the request object
  next(); // Proceed to the next middleware
});

// Middleware for enabling CORS and parsing JSON
app.use(cors({ origin: ["http://localhost:3000", "http://172.20.10.5:4000"] }));
app.use(express.json());

// Serve static files from the /uploads directory
app.use('/uploads', express.static('uploads'));

// Multer setup for handling file uploads (e.g., book covers)
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Store files in uploads/
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)) // Unique filename
});
const upload = multer({ storage }); // Create multer instance

// Define routes for books and authentication
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes); 

// Setup Socket.IO connection messages
io.on('connection', (socket) => {
  console.log('User  connected:', socket.id); // Log when a user connects
  socket.on('disconnect', () => {
    console.log('User  disconnected:', socket.id); // Log when a user disconnects
  });
});

// Connect to MongoDB and set up change streams for real-time updates
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const db = mongoose.connection;
    const bookCollection = db.collection('books');
    const changeStream = bookCollection.watch(); // Watch for changes in the books collection

    changeStream.on('change', (change) => {
      switch (change.operationType) {
        case 'insert':
          io.emit('bookCreated', change.fullDocument); // Emit event for new book
          break;
        case 'update':
          bookCollection.findOne({ _id: change.documentKey._id }).then((updatedDoc) => {
            io.emit('bookUpdated', updatedDoc); // Emit event for updated book
          });
          break;
        case 'delete':
          io.emit('bookDeleted', change.documentKey._id); // Emit event for deleted book
          break;
        default:
          break;
      }
    });

    const PORT = process.env.PORT || 4000; // Set the port
    server.listen(PORT,  () => {
      console.log("DB connected successfully");
      console.log(`Server running on port ${PORT}`); // Log server start
    });
  })
  .catch((err) => console.log("DB Connection Error:", err)); // Log any connection errors
