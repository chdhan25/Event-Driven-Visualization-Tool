import React, { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useRoute
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import '../../Screens/VisualizationSelector/styles.css'; // Import the CSS file
import Visualization from '../Visualization/index'; // Import the Visualization component
import '../../Screens/UploadScreen/Upload.css'; // Keep this as is

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
    <div className="container">
      <h1 className="title">Please select your visualization type below</h1>
      <div className="options-container">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedVisualization?.id === option.id ? 'selected-option' : ''}`}
            onClick={() => setSelectedVisualization(option)}
          >
            <img src={option.image} className="image" alt={`${option.name}`} />
            <p className="option-text">{option.name}</p>
          </div>
        ))}
      </div>
      <div
        className="create-button"
        onClick={handleCreateVisualization}
      >
        <p className="create-button-text">
          Create Visualization
        </p>
      </div>
    </div>
  );
};

export default VisualizationSelectionScreen;
