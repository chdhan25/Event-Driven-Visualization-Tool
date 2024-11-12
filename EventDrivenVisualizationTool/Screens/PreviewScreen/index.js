import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { ScrollView, TextInput } from 'react-native-web';
import { useRoute, useNavigation } from '@react-navigation/native';
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';


const PreviewScreen = (props) => {
  
  const route = useRoute();
  const navigation = useNavigation();
  const { flowchartData, uploadedCode, dropzoneFileList, parsedData } = route.params || {};

  const [previewText, setPreviewText] = useState("Select a file to view its text here");  

    


  // useEffect(() => {
  //   if (parsedData) {
  //     const flowData = generateFlowchartData(parsedData);
  //     console.log('Generated Flowchart Data:', flowData);
  //     setFlowchartData(flowData);
  //     console.log('parsed data in useEffect', parsedData);
  //   }
  // }, [parsedData]);

  // const handleContinue = () => {
  //   if (flowchartData) {
  //     console.log(flowchartData);
  //     navigation.navigate('VisualizationSelector', {
  //       flowchartData: flowchartData,
  //       uploadedCode: previewText, // This is the file content to show in CodeEditor
  //     });
  //   } else {
  //     message.warning('Please upload a valid code file before continuing.');
  //   }
  // };



    const previewList = dropzoneFileList.map(file => (
        <li key={file.path}>
        <Button
        onClick={() => {
            const reader = new FileReader();
            reader.onload = (e) => {

                const fileText = e.target.result;
                //console.log(fileText);
    

                setPreviewText(fileText);
                console.log(fileText);

            }
  
            reader.readAsText(file);
        }}
        >
            {file.path} - {file.size} bytes
        </Button>
        </li>
      ));

    return (
      <ScrollView>
    <section className = "dropzone">
    <aside>
        <h4>Files (Click on a File's Listing to Preview its text)</h4>
        <ul>{previewList}</ul>
        <div className='previewPane'>
        <TextInput
        style={{width: '95%'}}
        value={previewText}
        multiline={true}
        readOnly={true}

        />
    </div>
        
    </aside>

    <Button onClick={handleContinue}>Continue</Button>
    </section>
    </ScrollView>
   
    );
};

export default PreviewScreen;