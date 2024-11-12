// CodeEditor.js
import React, { useState } from 'react';
import { Monaco } from '@monaco-editor/react';

const CodeEditor = ({ code, onCodeChange }) => {
  const [value, setValue] = useState(code || '');

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onCodeChange(newValue);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Monaco
        height="400px"
        defaultLanguage="c"
        theme="vs-dark"
        value={value}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
