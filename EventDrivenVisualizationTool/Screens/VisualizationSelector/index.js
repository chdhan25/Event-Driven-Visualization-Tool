import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Button, Alert} from 'react-native';
import {visualizationSelectionScreenStyles as styles} from './styles';

const VisualizationSelectionScreen = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, name: 'Flowchart', image: require('../../assets/Flowchart.png')},
        { id: 2, name: 'Force', image: require('../../assets/Force.png')},
        { id: 3, name: 'Hierarchy', image: require('../../assets/Hierarchy.png')},
    ];

    const handleCreateVisualization = () => {
        if(selectedOption) {
            Alert.alert('Creating a ${selectedOption.name} visualization');

            // Here we can add the Visualization logic or a transfer to it

        } else {
            Alert.alert('An option must be selected first!');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Event Driven Visualization Tool</Text>
            <View style={styles.optionContainer}>
                {options.map(option => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.option,
                            selectedOption?.id === option.id && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption(option)}
                    >
                        <Image source={option.image} style={styles.image}/>
                        <Text style={styles.optionText}>{option.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button title="Create Visualization" onPress={handleCreateVisualization} />
        </View>
    );
};

export default VisualizationSelectionScreen;