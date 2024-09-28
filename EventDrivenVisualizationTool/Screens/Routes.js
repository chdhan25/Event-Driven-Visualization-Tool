import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from './App';
import Upload from './Upload/index';
import VisualizationSelector from './VisualizationSelector/index'

function Upload() {
  return (
    <View>
      <Text>Upload Screen</Text>
    </View>
  );
}

function VisualizationSelector() {
  return (
    <View>
      <Text>Visualization Selector Screen</Text>
    </View>
  );
}

function Visualization() {
    return (
      <View>
        <Text>Visualization Screen</Text>
      </View>
    );
  }

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        {/*Define our routes*/}
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="VisualizationSelector" component={VisualizationSelector} />
        <Stack.Screen name="Visualization" component={Visualization} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}