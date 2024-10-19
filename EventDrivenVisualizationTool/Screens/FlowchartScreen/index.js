import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import CodeEditor from '../../components/CodeEditor'; // Ensure this is your CodeEditor
import Visualization from '../Visualization';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';

const FlowchartScreen = ({ route }) => {
  const { flowchartData: initialFlowchartData, uploadedCode } = route.params;

  const [code, setCode] = useState(uploadedCode || ''); // Initialize with uploadedCode
  const [savedCode, setSavedCode] = useState(uploadedCode || '');
  const [flowchartData, setFlowchartData] = useState(
    initialFlowchartData || {}
  );

  useEffect(() => {
    console.log('Current code in editor:', code);
  }, [code]);

  // Update and regenerate flowchart
  const handleUpdate = () => {
    setSavedCode(code); // Save the current code
    Alert.alert('Code Updated', 'Your code has been successfully updated.');

    // Parse and regenerate the flowchart based on updated code
    const parsedData = parseCCode(code);
    const updatedFlowchartData = generateFlowchartData(parsedData);
    setFlowchartData(updatedFlowchartData);
  };

  return (
    <View style={styles.container}>
      {/* Left side: Code Editor */}
      <View style={styles.codeEditorContainer}>
        <CodeEditor code={code} onCodeChange={setCode} />{' '}
        {/* Pass the code and the update function */}
        <Button title="Update" onPress={handleUpdate} />
      </View>

      {/* Right side: Visualization */}
      <View style={styles.flowchartContainer}>
        <Visualization flowchartData={flowchartData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  codeEditorContainer: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  flowchartContainer: {
    flex: 2,
    padding: 10,
  },
});

export default FlowchartScreen;
