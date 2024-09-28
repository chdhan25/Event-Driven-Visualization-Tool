import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadScreen from './Screens/UploadScreen';
import VisualizationSelectionScreen from './Screens/VisualizationSelector';
import FlowchartScreen from './Screens/FlowchartScreen'; // Import the FlowchartScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UploadScreen">
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen
          name="VisualizationSelector"
          component={VisualizationSelectionScreen}
        />
        <Stack.Screen name="Flowchart" component={FlowchartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
