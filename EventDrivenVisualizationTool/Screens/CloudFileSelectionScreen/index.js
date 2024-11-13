import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { ScrollView, TextInput } from 'react-native-web';
import { useRoute, useNavigation } from '@react-navigation/native';
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';
import { parseCppCode } from '../../ApplicationLogic/parsing/cppParser';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { findFlowcharts, downloadParsedCode } from '../../ApplicationLogic/firebase';


const CloudFileSelectionScreen = (props) => {
  
  const route = useRoute();
  const navigation = useNavigation();
  //const { cloudList } = route.params || {};

  const [flowchartPreviewText, setFlowchartPreviewText] = useState("");  
  const [flowchartData, setFlowchartData] = useState(null);
  const [flowchartList, setFlowchartList] = useState(new Array());
  const [parsedCpp, setParsedCpp] = useState(new Array());
  const [parsedC, setParsedC] = useState(new Array());
  const [parsedData, setParsedData] = useState(null);



    const handleContinue = () => {
        if (flowchartData) {
            console.log(flowchartData);
            navigation.navigate('VisualizationSelector', {
                flowchartData: flowchartData,
                uploadedCode: '',
            });
        } else {
        message.warning('Please select a flowchart before continuing.');
        }
    };



    const flowchartPreviewList = flowchartList.map(flowchart => (
        <li key={flowchart}>
        <Button
        onClick={() => {
            downloadParsedCode(flowchart, setFlowchartPreviewText, setFlowchartData);
        }}
        >
            {flowchart}
        </Button>
        </li>
      ));

    return (
      <ScrollView>
    <section className = "dropzone">
    <aside>
        <h4>Flowcharts (Click on a Flowcharts's Listing to load its contents)</h4>
        <Button onClick={() => {findFlowcharts(setFlowchartList);}}>Retrieve Flowcharts from Cloud</Button>
        <ul>{flowchartPreviewList}</ul>
        <div className='previewPane'>
        <TextInput
        value={flowchartPreviewText}
        multiline={true}
        readOnly={true}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '10px' }}
        />
    </div>
        
    </aside>

    <Button onClick={handleContinue}>Continue</Button>
    </section>
    </ScrollView>
   
    );
};

export default CloudFileSelectionScreen;