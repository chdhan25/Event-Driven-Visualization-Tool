import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useRoute
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native';
import { VisualizationSelectionScreenStyles as styles } from './styles';
import Visualization from '../Visualization/index'; // Import the Visualization component

const VisualizationSelectionScreen = () => {
  const route = useRoute(); // Get route params
  const { flowchartData, selectedOption } = route.params; // Destructure the passed data
  const navigation = useNavigation();

  /* 
        These are the options for visualizations that we create.
        The Flowchart is currently in progress.
        Force and Hierarchy are future/stretch goals.
    */
  const options = [
    { id: 1, name: 'Flowchart', image: require('../../assets/Flowchart.png') },
    { id: 2, name: 'Force', image: require('../../assets/Force.png') },
    { id: 3, name: 'Hierarchy', image: require('../../assets/Hierarchy.png') },
  ];

  const [selectedVisualization, setSelectedVisualization] =
    useState(selectedOption);

  /*
        This is where the visualization creation methods should be called.
        They can be implemented somewhere else but based on which option is selected
        the respective create function should be called.

        (The Alerts are currently not working, research is being done as to why)
    */
  const handleCreateVisualization = () => {
    console.log('Flowchart Data before navigating:', flowchartData); // Log the data

    if (selectedVisualization?.name === 'Flowchart' && flowchartData) {
      navigation.navigate('Flowchart', { flowchartData }); // Navigate to FlowchartScreen
    } else {
      Alert.alert(
        'Selection Required',
        'Please select a valid visualization option before proceeding.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      );
    }
  };

  /*
        This is the Visualization Selection Page containing the three options
        and a create visualization button.
    */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Driven Visualization Tool</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedVisualization?.id === option.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedVisualization(option)}
          >
            <Image source={option.image} style={styles.image} />
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <RNTouchableOpacity
        style={styles.createButton}
        onPress={handleCreateVisualization}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          Create Visualization
        </Text>
      </RNTouchableOpacity>
    </View>
  );
};

export default VisualizationSelectionScreen;
