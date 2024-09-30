import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { TextInput } from 'react-native-web';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../ApplicationLogic/firebase';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { useNavigation } from '@react-navigation/native';
import './Upload.css'; // Import the external CSS file
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';
import '../../Screens/UploadScreen/Upload.css';

export default function UploadScreen() {
  // State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  const [fileUploaded, setFileUploaded] = useState(false); // Track upload state
  const [codePreviewText, setCodePreviewText] = useState(
    'Upload and select a source code file to view its contents here.'
  );
  const [codePreviewTextColor, setCodePreviewTextColor] = useState('black');
  const [codePreviewBGColor, setCodePreviewBGColor] = useState('white');
  const [parsedData, setParsedData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);
  const [uploadedCode, setUploadedCode] = useState(''); // State to store the uploaded code

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    if (parsedData) {
      const flowData = generateFlowchartData(parsedData);
      console.log('Generated Flowchart Data:', flowData);
      setFlowchartData(flowData);
    }
  }, [parsedData]);

  const handleContinue = () => {
    console.log('Flowchart Data:', flowchartData);

    if (flowchartData) {
      // Navigate to the visualization selector screen with flowchartData and uploadedCode
      navigation.navigate('Flowchart', { flowchartData, uploadedCode });
    } else {
      message.warning('Please upload a valid code file before continuing.');
    }
  };

  const handleFileUpload = (file) => {
    message.success(
      `Source code "${file.name}" uploaded to code pane successfully.`
    );
    setUploaderBottomPadding(uploaderBottomPadding + 30);
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      setCodePreviewText(fileText);
      const parsed = parseCCode(fileText);
      console.log('Parsed Data:', parsed);
      setParsedData(parsed);
    };
    reader.readAsText(file);
    
    setFileUploaded(true); // Set upload state to true
    return false; // Prevent auto upload
  };

  const handleReUpload = () => {
    setFileUploaded(false); // Reset the upload state
    setCodePreviewText('Upload and select a source code file to view its contents here.'); // Reset preview text
    setUploaderBottomPadding(20); // Reset padding if needed
  };

  return (
    <div className="page-container">
      <div className="header" id="heading">
        <h1>Event Driven Visualization Tool</h1>
      </div>

      <div id="upload" style={{ paddingBottom: uploaderBottomPadding }}>

        {!fileUploaded ? (
          <Upload.Dragger
            multiple
            accepts=".c,.cpp"
            listType="text"
            beforeUpload={handleFileUpload}
            onRemove={handleReUpload}
          >
            <p>Drag files here</p>
            <p>OR</p>
            <Button>Click Upload</Button>
          </Upload.Dragger>
        ) : (
          <div>
            <h2>Code Preview Pane:</h2>
            <Button
              className="upload-buttons"
              onClick={() => setCodePreviewBGColor('white')}
            >
              Light Mode
            </Button>
            <Button
              className="upload-buttons"
              onClick={() => setCodePreviewBGColor('black')}
            >
              Dark Mode
            </Button>
            <TextInput
              style={{
                backgroundColor: codePreviewBGColor,
                color: codePreviewTextColor,
                width: '80%', // Ensure it takes the full width
                height: '300px',
                overflowY: 'auto',
              }}
              className="text-input"
              onChangeText={setCodePreviewText}
              value={codePreviewText}
              multiline={true}
            />
            <Button onClick={handleReUpload} style={{ marginTop: '20px' }}>
              Upload New File
            </Button>
          </div>
        )}
      </div>

      <h2>List Source Code Files Saved on Cloud</h2>
      <Button className="upload-buttons">List C Source Files</Button>
      <Button className="upload-buttons">List C++ Source Files</Button>

      <Button
        className="continue-button"
        type="primary"
        onClick={handleContinue}
        style={{ marginTop: '20px' }}
      >
        Continue
      </Button>
    </div>
  );
}
