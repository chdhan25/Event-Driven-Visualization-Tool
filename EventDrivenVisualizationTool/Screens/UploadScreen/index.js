import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { TextInput } from 'react-native-web';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { firebaseConfig } from '../../ApplicationLogic/firebase';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { useNavigation } from '@react-navigation/native';
import './Upload.css'; // Import the external CSS file
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';

export default function UploadScreen() {
  // State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  const [codePreviewText, setCodePreviewText] = useState(
    'Upload and select a source code file to view its contents here.'
  );
  const [codePreviewTextColor, setCodePreviewTextColor] = useState('black');
  const [codePreviewBGColor, setCodePreviewBGColor] = useState('white');
  const [parsedData, setParsedData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);

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
      // Navigate to the visualization selector screen
      navigation.navigate('VisualizationSelector', { flowchartData });
      
      navigation.navigate('FlowchartScreen', { flowchartData});
    } else {
      message.warning('Please upload a valid code file before continuing.');
    }

  };

  return (
    <div className="page-container">
      <div id="heading">
        <h1>Event Driven Visualization Tool</h1>
      </div>

      <div id="upload" style={{ paddingBottom: uploaderBottomPadding }}>
        <Upload.Dragger
          multiple
          accepts=".c,.cpp"
          listType="text"
          beforeUpload={(file) => {
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
            return false;
          }}
          onRemove={(file) => {
            setUploaderBottomPadding(uploaderBottomPadding - 30);
            message.warning(`File "${file.name}" deleted.`);
          }}
        >
          <p>Drag files here</p>
          <p>OR</p>
          <Button>Click Upload</Button>
        </Upload.Dragger>
      </div>

      <h2>List Source Code Files Saved on Cloud</h2>
      <Button
        className="upload-buttons"
        onClick={() => {
          /* List C source files */
        }}
      >
        List C Source Files
      </Button>
      <Button
        className="upload-buttons"
        onClick={() => {
          /* List C++ source files */
        }}
      >
        List C++ Source Files
      </Button>

      <h2>Code Preview Pane (Editable)</h2>
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
        }}
        className="text-input"
        onChangeText={setCodePreviewText}
        value={codePreviewText}
        multiline={true}
      />

      <Button
        type="primary"
        onClick={handleContinue}
        style={{ marginTop: '20px' }}
      >
        Continue
      </Button>
    </div>
  );
}
