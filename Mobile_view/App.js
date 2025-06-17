import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddEditBookScreen from './screens/AddEditBookScreen';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'register', 'addEditBook'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
  };

  const handleRegisterLink = () => {
    setCurrentView('register');
  };

  const handleLoginLink = () => {
    setCurrentView('login');
  };

  const handleAddEditBook = (book = null) => {
    setSelectedBook(book);
    setCurrentView('addEditBook');
  };

  const handleBackToHome = () => {
    setSelectedBook(null);
    setCurrentView('home');
  };

  const handleClose = () => {
    setCurrentView('home');
  };

  // Render views conditionally
  if (!isLoggedIn) {
    if (currentView === 'login') {
      return (
        <>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onRegisterLink={handleRegisterLink}
            onClose={handleClose}
          />
        </>
      );
    } else if (currentView === 'register') {
      return (
        <>
          <StatusBar backgroundColor="lightgreen" barStyle="light-content" />
          <RegisterScreen
            onLoginLink={handleLoginLink}
            onClose={handleClose}
          />
        </>
      );
    } else {
      // Default to home view for logged out users (show login/register buttons)
      return (
        <>
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <HomeScreen
            isLoggedIn={false}
            onLogin={() => setCurrentView('login')}
            onRegister={() => setCurrentView('register')}
            onAddEditBook={handleAddEditBook}
            onLogout={handleLogout}
          />
        </>
      );
    }
  } else {
    // Logged in views
    if (currentView === 'addEditBook') {
      return (
        <>
          <StatusBar backgroundColor="lightgreen" barStyle="light-content" />
          <AddEditBookScreen
            book={selectedBook}
            onBack={handleBackToHome}
          />
        </>
      );
    } else {
      return (
        <>
          <StatusBar backgroundColor="lightgreen" barStyle="light-content" />
          <HomeScreen
            isLoggedIn={true}
            onAddEditBook={handleAddEditBook}
            onLogout={handleLogout}
            onLogin={() => setCurrentView('login')}
            onRegister={() => setCurrentView('register')}
          />
        </>
      );
    }
  }
}
