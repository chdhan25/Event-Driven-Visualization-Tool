import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import CodeEditor from '../../components/CodeEditor';
import Visualization from '../Visualization';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';

const FlowchartScreen = ({ route }) => {
  const { flowchartData: initialFlowchartData, uploadedCode } = route.params;

  const [code, setCode] = useState(uploadedCode || '');
  const [savedCode, setSavedCode] = useState(uploadedCode || '');
  const [flowchartData, setFlowchartData] = useState(
    initialFlowchartData || {}
  );

  useEffect(() => {
    console.log('Current code in editor:', code);
  }, [code]);

  // This function handles the update and regenerates the flowchart
  const handleUpdate = () => {
    setSavedCode(code); // Save the current code
    Alert.alert('Code Updated', 'Your code has been successfully updated.');

    // Parse the updated code
    const parsedData = parseCCode(code);
    console.log('Parsed Data:', parsedData);

    // Regenerate the flowchart based on the updated parsed data
    const updatedFlowchartData = generateFlowchartData(parsedData);
    console.log('Updated Flowchart Data:', updatedFlowchartData);

    // Update the flowchart with the newly generated data
    setFlowchartData(updatedFlowchartData);
  };

  // Error handling in case flowchartData is missing
  if (!flowchartData || !flowchartData.nodes || !flowchartData.edges) {
    return <div>No flowchart data available</div>;
  }

  return (
    <View style={styles.container}>
      {/* Left side: Code Editor */}
      <View style={styles.codeEditorContainer}>
        <CodeEditor code={code} onCodeChange={setCode} />
        {/* Add "Update" button below the CodeEditor */}
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
    flex: 1, // Takes up 1/3 of the screen
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  flowchartContainer: {
    flex: 2, // Takes up 2/3 of the screen
    padding: 10,
  },
});

export default FlowchartScreen;
