import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createBook, updateBook } from '../api/api';

export default function AddEditBookScreen({ book, onBack }) {
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [genre, setGenre] = useState(book?.genre || '');
  const [year, setYear] = useState(book?.yearPublished || '');
  const [cover, setCover] = useState(null);

  const pickImage = async () => {
    try {
      Alert.alert('Info', 'Requesting media library permission...');
      // Request permission to access media library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Cannot select image without media library permission');
        return;
      }
      Alert.alert('Info', 'Permission granted. Launching image picker...');
      // Launch image library to pick an image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: false,
        allowsEditing: true,
      });
      Alert.alert('Info', `Image picker result: ${JSON.stringify(result)}`);

      if (!result.canceled) {
        const asset = result.assets[0];
        setCover({
          uri: asset.uri,
          type: asset.type || 'image',
          fileName: asset.fileName || asset.uri.split('/').pop(),
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open image picker. Please try again.');
      console.error('Image picker error:', error);
    }
  };


const handleSubmit = async () => {
  Alert.alert('Debug', 'Create button pressed, submitting form...');
  console.log('Create button pressed, submitting form...');
  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('genre', genre);
  formData.append('yearPublished', year);
  if (cover) {
    formData.append('cover', {
      uri: cover.uri,
      type: cover.type,
      name: cover.name || cover.fileName,
    });
  }

  try {
    if (book) {
      await updateBook(book._id, formData);
    } else {
      await createBook(formData);
    }
    console.log("Book created/updated successfully");
    Alert.alert('Success', 'Book created/updated successfully');
    onBack(); // This should close the modal and go back to the previous screen
  } catch (error) {
    console.error("Create/Update book error:", error.response || error.message || error);
    Alert.alert('Error', 'Failed to save the book. Please try again. ' + (error.response?.data?.message || error.message || ''));
  }
};


  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} />
      <TextInput style={styles.input} placeholder="Genre" value={genre} onChangeText={setGenre} />
      <TextInput style={styles.input} placeholder="Year Published" value={year} onChangeText={setYear} />
      {cover && <Image source={{ uri: cover.uri }} style={styles.image} />}
      <Button title="Select Image" onPress={pickImage} />
      <Button title={book ? "Update" : "Create"} onPress={handleSubmit} />
      <Button title="Cancel" onPress={onBack} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  image: {
    height: 150,
    marginVertical: 10,
    borderRadius: 5,
  },
});
