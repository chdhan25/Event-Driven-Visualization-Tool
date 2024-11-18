import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { ScrollView, TextInput } from 'react-native-web';
import { useRoute, useNavigation } from '@react-navigation/native';
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';
import { parseCppCode } from '../../ApplicationLogic/parsing/cppParser';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import previewScreenTooltip from '../../components/HelpTooltips/PreviewScreenTooltip';
import { ForwardOutlined, QuestionCircleTwoTone } from '@ant-design/icons';


const PreviewScreen = (props) => {
  
  const route = useRoute();
  const navigation = useNavigation();
  const { uploadedCode, dropzoneFileList } = route.params || {};

  const [previewText, setPreviewText] = useState("Select a file to view its text here");  
  const [flowchartData, setFlowchartData] = useState(null);
  const [parsedCpp, setParsedCpp] = useState(new Array());
  const [parsedC, setParsedC] = useState(new Array());
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    //Add help button to header
    navigation.setOptions({
      headerRight: () => (
        <Button 
        className='upload-buttons'
        icon={<QuestionCircleTwoTone/>}
        onClick={() => {previewScreenTooltip()}}
        >Help</Button>
      ),
    });
  }, [navigation]);
    
  useEffect(() => {
    if (parsedData) {
      const flowData = generateFlowchartData(parsedData);
      console.log('preview screen flowchart data:', flowData);

      setFlowchartData(flowData);
      console.log('parsed data in useEffect', parsedData);
    }
  }, [parsedData]);



   const handleContinue = () => {
     if (flowchartData) {
       console.log(flowchartData);
       navigation.navigate('VisualizationSelector', {
         flowchartData: flowchartData,
         uploadedCode: previewText, // This is the file content to show in CodeEditor
       });
     } else {
       message.warning('Please upload a valid code file before continuing.');
     }
   };



    const previewList = dropzoneFileList.map(file => (
        <li key={file.path}>
        <Button
        onClick={() => {
            const reader = new FileReader();
            reader.onload = (e) => {
              const fileName = file.name;
              const extension = fileName.split('.').pop().toLowerCase();
              const fileText = e.target.result;
              if (extension === 'c') {
                const parsed = parseCCode(fileText);
                setParsedData(parsed);
              } else if (extension === 'cpp') {
                const parsedCpp = parseCppCode(fileText);
                setParsedData(parsedCpp);
              }
                setPreviewText(fileText);
                console.log("this is file text" +fileText);

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
        // style={{width: '95%'}}
        value={previewText}
        multiline={true}
        readOnly={true}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '10px' }}
        />
    </div>
        
    </aside>

    <Button
    className='upload-buttons'
    icon={<ForwardOutlined/>}
    iconPosition='end'
    onClick={handleContinue}>Continue</Button>
    </section>
    </ScrollView>
   
    );
};

export default PreviewScreen;