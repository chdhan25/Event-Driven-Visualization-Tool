import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Alert, TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { VisualizationSelectionScreenStyles as styles } from './styles';

const VisualizationSelectionScreen = () => {
    const [selectedOption, setSelectedOption] = useState(null);

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


    /*
        This is where the visualization creation methods should be called.
        They can be implemented somewhere else but based on which option is selected
        the respective create function should be called.

        (The Alerts are currently not working, research is being done as to why)
    */
    const handleCreateVisualization = () => {
        console.log('Selected Option:', selectedOption);
        if (selectedOption) {
            console.log('Alert for:', selectedOption.name);
            Alert.alert[(`Creating a ${selectedOption.name} visualization`)];
        } else {
            console.log('Alert for no selection');
            Alert.alert('Selection Required', 'Please select and option before proceeding.', [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
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
                {options.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.option,
                            selectedOption?.id === option.id && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption(option)}
                    >
                        <Image source={option.image} style={styles.image} />
                        <Text style={styles.optionText}>{option.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <RNTouchableOpacity style={styles.createButton} onPress={handleCreateVisualization}>
                <Text style={{ color: 'white', fontSize: 18 }}>Create Visualization</Text>
            </RNTouchableOpacity>
        </View>
    );
};

export default VisualizationSelectionScreen;