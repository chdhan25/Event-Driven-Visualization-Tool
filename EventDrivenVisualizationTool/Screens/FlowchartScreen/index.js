import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
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

  // State to control legend visibility
  const [showLegend, setShowLegend] = useState(false);

  useEffect(() => {
    console.log('Current code in editor:', code);
  }, [code]);

  // Update and regenerate flowchart
  const handleUpdate = () => {
    setSavedCode(code); // Save the current code
    alert('Code Updated', 'Your code has been successfully updated.');

    // Parse and regenerate the flowchart based on updated code
    const parsedData = parseCCode(code);
    const updatedFlowchartData = generateFlowchartData(parsedData);
    setFlowchartData(updatedFlowchartData);
  };

  // Toggle the legend
  const toggleLegend = () => {
    setShowLegend((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Left side: Code Editor */}
      <View style={styles.codeEditorContainer}>
        <CodeEditor code={code} onCodeChange={setCode} />
        <Button title="Update" onPress={handleUpdate} />
      </View>

      {/* Right side: Visualization */}
      <View style={styles.flowchartContainer}>
        <Visualization flowchartData={flowchartData} />

        {/* Legend Button */}
        <TouchableOpacity style={styles.legendButton} onPress={toggleLegend}>
          <Text style={styles.legendButtonText}>
            {showLegend ? 'Hide Legend' : 'Show Legend'}
          </Text>
        </TouchableOpacity>

        {/* Legend Display */}
        {showLegend && (
          <View style={styles.legendBox}>
            <Text style={styles.legendTitle}>Legend</Text>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: '#f0f8ff' }]}
              />
              <Text style={styles.legendText}>ISR Node</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: '#d3f8d3' }]}
              />
              <Text style={styles.legendText}>Assignment Node</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: '#f8d3d3' }]}
              />
              <Text style={styles.legendText}>Return Node</Text>
            </View>
          </View>
        )}
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
    position: 'relative', // Ensures legend is relative to this container
  },
  legendButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  legendButtonText: {
    color: 'white',
    fontSize: 14,
  },
  legendBox: {
    position: 'absolute',
    top: 50,
    right: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1000, // Ensures it's above other elements
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  legendText: {
    fontSize: 14,
  },
});

export default FlowchartScreen;
