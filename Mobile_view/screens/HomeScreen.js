import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import BookCard from '../components/BookCard';
import AddEditBookScreen from './AddEditBookScreen';
import { getBooks, deleteBook } from '../api/api';
import socket from '../socket/socket';

export default function HomeScreen({ isLoggedIn, onLogin, onRegister, onLogout }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();

    // Listen for socket events
    socket.on("bookCreated", (newBook) => {
      setBooks((prev) => [newBook, ...prev]); // Add new book to the list
      setFilteredBooks((prev) => [newBook, ...prev]); // Update filtered books
    });

    socket.on("bookUpdated", (updatedBook) => {
      setBooks((prev) => prev.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
      setFilteredBooks((prev) => prev.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
    });

    socket.on("bookDeleted", (id) => {
      setBooks((prev) => prev.filter((book) => book._id !== id));
      setFilteredBooks((prev) => prev.filter((book) => book._id !== id));
    });

    // Cleanup socket listeners on unmount
    return () => {
      socket.off("bookCreated");
      socket.off("bookUpdated");
      socket.off("bookDeleted");
    };
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
    setFilteredBooks(data);
  };

  const handleSearch = (text) => {
    setSearchAuthor(text);
    if (text === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.author.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleAddBook = () => {
    console.log("Add Book button pressed");
    setSelectedBook(null);
    setModalVisible(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const handleDeleteBook = async (bookId) => {
    await deleteBook(bookId);
    fetchBooks();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    fetchBooks();
  };

  if (!isLoggedIn) {
    return (
      <ImageBackground 
        source={require('../assets/bg.jpg')} 
        style={styles.background}
      >
        <View style={styles.loginContainer}>
          <Button title="Login" onPress={onLogin} color="midnightblue" />
          <Text style={styles.createAccountText}>
            Don't have an account?{' '}
            <Text style={styles.link} onPress={onRegister}>
              Create New Account
            </Text>
          </Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Book Library</Text>
      <View style={styles.searchAddContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by author"
          placeholderTextColor="#999"
          value={searchAuthor}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <BookCard
            book={item}
            onEdit={() => handleEditBook(item)}
            onDelete={() => handleDeleteBook(item._id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      {console.log("Modal visible:", modalVisible)}
      <Modal visible={modalVisible} animationType="slide">
        <AddEditBookScreen book={selectedBook} onBack={handleModalClose} />
      </Modal>
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },
  createAccountText: {
    marginTop: 15,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  searchAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
