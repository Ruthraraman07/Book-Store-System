import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: `http://localhost:4000/${book.cover}` }} style={styles.image} />
      <Text style={styles.title}>{book.title} by {book.author}</Text>
      <Text>Genre: {book.genre}</Text>
      <Text>Year: {book.yearPublished}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Icon name="edit" size={24} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
          <Icon name="delete" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  image: {
    height: 150,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
  },
});
