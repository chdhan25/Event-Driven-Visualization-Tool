import React from 'react';
import Visualization from '../Visualization'; // Adjust this path if needed
import '../../Screens/UploadScreen/Upload.css';


const FlowchartScreen = ({ route }) => {
  const { flowchartData } = route.params;

  // Error handling in case flowchartData is missing
  if (!flowchartData || !flowchartData.nodes || !flowchartData.edges) {
    return <div>No flowchart data available</div>;
  }

  return <Visualization flowchartData={flowchartData} />;
};

export default FlowchartScreen;
