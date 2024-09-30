import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CodeEditor = ({ code, onCodeChange }) => {
  return (
    <TextInput
      style={styles.editor}
      multiline
      value={code}
      onChangeText={onCodeChange} // This will update the code as the user types
      placeholder="Edit the C code here..."
      selectionColor="#000"
      autoCapitalize="none"
    />
  );
};

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
