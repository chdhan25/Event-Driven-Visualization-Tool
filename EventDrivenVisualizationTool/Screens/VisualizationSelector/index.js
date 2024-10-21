import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Alert, TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { VisualizationSelectionScreenStyles as styles } from './styles';
import Flowchart from '../../ApplicationLogic/flowchart/Flowchart';
import Visualization from '../Visualization';
import { Modal } from 'antd';
import { useRoute, useNavigation } from '@react-navigation/native';

const VisualizationSelectionScreen = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const route = useRoute();
    const navigation = useNavigation();

  // Extract the data from route params
    const { flowchartData, uploadedCode } = route.params || {};


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

    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    
    const handleModalCancel = () => {
      setIsModalVisible(false); // Close the modal
    };

    const onCreateClick = (event) => {
      setIsModalVisible(true); // Show the modal
              // Perform any necessary actions when a node is clicked
    };

    /*
        This is where the visualization creation methods should be called.
        They can be implemented somewhere else but based on which option is selected
        the respective create function should be called.

        (The Alerts are currently not working, research is being done as to why)
    */
    const handleCreateVisualization = () => {
        console.log('Selected Option:', selectedOption);
        if (selectedOption == 'Flowchart') {
            console.log('Alert for:', selectedOption.name);
            Alert.alert[(`Creating a ${selectedOption.name} visualization`)];
            setIsModalVisible(false)

            navigation.navigate('FlowchartScreen', {
              flowchartData: flowchartData,
              uploadedCode: uploadedCode
            });
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
                        onPress={() => setSelectedOption(option.name)}
                    >
                        <Image source={option.image} style={styles.image} />
                        <Text style={styles.optionText}>{option.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <RNTouchableOpacity style={styles.createButton} onPress={onCreateClick}>
                <Text style={{ color: 'white', fontSize: 18 }}>Create Visualization</Text>
            </RNTouchableOpacity>
            <Modal
                title="Visualization Confirmation"
                open={isModalVisible}
                onOk={handleCreateVisualization}
                onCancel={handleModalCancel}
            >
              <p>currently creating visualization if ok</p>
            </Modal>
        </View>
    );
};

export default VisualizationSelectionScreen;