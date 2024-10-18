import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CodeEditor = ({ code, onCodeChange }) => {
  return (
    <TextInput
      style={styles.editor} // Make sure 'styles' is defined properly below
      multiline
      value={code}
      onChangeText={onCodeChange}
      placeholder="Edit the C code here..."
      selectionColor="#000"
      autoCapitalize="none"
    />
  );
};

// Add this part to define styles
const styles = StyleSheet.create({
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
});

export default CodeEditor;
