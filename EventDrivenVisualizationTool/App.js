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
      <Stack.Navigator
        initialRouteName="UploadScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#9fcce4', // Match the header background color
            borderBottomWidth: 0, // Remove the bottom border
            shadowOpacity: 0, // Remove shadow to ensure no border appears
          },
          headerTintColor: 'black', // Set the text to black
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false, // Remove the shadow/border if present
        }}
      >
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen
          name="VisualizationSelector"
          component={VisualizationSelectionScreen}
        />
        <Stack.Screen name="FlowchartScreen" component={FlowchartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
