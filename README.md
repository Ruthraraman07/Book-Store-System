# Book Library System

## Project Overview
This project is a Book Library system consisting of three main parts:  
- **Backend:** A RESTful API server built with Node.js, Express, and MongoDB. It handles user authentication, book management, image uploads, and real-time updates via Socket.io.  
- **Frontend:** A web application built with React that allows users to register, login, and manage books through a user-friendly interface.  
- **Mobile App:** A mobile application built with React Native and Expo, providing similar functionality as the web frontend for mobile users.

## Technology Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, Multer, JWT, bcrypt, dotenv  
- **Frontend:** React, JavaScript, CSS  
- **Mobile App:** React Native, Expo, React Navigation, Axios, Socket.io-client

## Setup and Run Instructions

### Backend
1. Navigate to the `Backend` directory.  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Create a `.env` file in the `Backend` directory with necessary environment variables (e.g., `MONGO_URI`, `PORT`).  
4. Start the backend server:  
   ```bash
   npm run start
   ```  
   Or for development with auto-reload:  
   ```bash
   npm run dev
   ```  

### Frontend
1. Navigate to the `frontend` directory.  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the frontend development server:  
   ```bash
   npm start
   ```  
4. Access the frontend at [http://localhost:3000](http://localhost:3000).

### Mobile App
1. Navigate to the `mobile_view` directory.  
2. Install dependencies:  
   ```bash
   npm install
   ```  
3. Start the Expo development server:  
   ```bash
   npm run start
   ```  
4. Use the Expo app on your mobile device or an emulator to run the mobile app.



## Known Limitations or Features Not Implemented
- [Add any known limitations or unimplemented features here.]  
- Currently, no automated tests are included.  
- Real-time updates depend on a stable WebSocket connection.  
- Mobile app may have limited platform-specific optimizations.

## License
This project is licensed under the MIT License.
