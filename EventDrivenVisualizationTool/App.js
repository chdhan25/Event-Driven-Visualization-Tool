import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadScreen from './Screens/UploadScreen';
import VisualizationSelectionScreen from './Screens/VisualizationSelector';

const Stack = createNativeStackNavigator();

/*
  The App.js will essentially be in control of the screens.
  Other logic for uploading has been moved to the UploadScreen.
*/
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Upload">
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="VisualizationSelector" component={VisualizationSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}