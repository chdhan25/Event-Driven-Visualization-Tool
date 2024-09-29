import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { TextInput } from 'react-native-web';
import { initializeApp } from 'firebase/app';
/*import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from 'firebase/storage';*/
import { 
  firebaseConfig,
  listCSourceCodeFiles,
  listCPlusPlusSourceCodeFiles,
  uploadCSourceCodeFile,
  uploadCPlusPlusSourceCodeFile,
  downloadCSourceCodeFile,
  downloadCPlusPlusSourceCodeFile,
  uploadParsedCode
} from '../../ApplicationLogic/firebase';
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
  const [uploadfileTitle, setUploadFileTitle] = useState("Code");
  const [downloadFileTitle, setDownloadFileTitle] = useState("Old_Code");
  const [parsedCodeTitle, setParsedCodeTitle] = useState("Flowchart");
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
          listCSourceCodeFiles();
        }}
      >
        List C Source Files
      </Button>
      <Button
        className="upload-buttons"
        onClick={() => {
          listCPlusPlusSourceCodeFiles();
        }}
      >
        List C++ Source Files
      </Button>

      <h2>Download Source Files</h2>
      Input name of source code file to be downloaded and displayed in the code preview pane below. File name must include ".c" or ".cpp" extension.
      <input 
      value = {downloadFileTitle}
      onChange={e => setDownloadFileTitle(e.target.value)}
      />

      <Button
        className="upload-buttons"
        onClick={() => {
          const reply = "";
          downloadCSourceCodeFile(downloadFileTitle, reply);
          setCodePreviewText(reply);
        }}
      >
        Download C Source Code File
      </Button>

      <Button
        className="upload-buttons"
        onClick={() => {
          const reply = "";
          downloadCPlusPlusSourceCodeFile(downloadFileTitle, reply);
          setCodePreviewText(reply);
        }}
      >
        Download C++ Source Code File
      </Button>

      <h2>Code Preview Pane (Editable)</h2>
      <Button
        className="upload-buttons"
        onClick={() => {
          setCodePreviewBGColor('white');
          setCodePreviewTextColor('black');
        }}
      >
        Light Mode
      </Button>
      <Button
        className="upload-buttons"
        onClick={() => {
          setCodePreviewBGColor('black');
          setCodePreviewTextColor('white');
        }}
      >
        Dark Mode
      </Button>

      <TextInput
        className="text-input"
        style={{
          backgroundColor: codePreviewBGColor,
          color: codePreviewTextColor,
          width: "80%",
          height: "70%",
          minHeight: "200px",
          padding: "20px",
          overflow: 'auto',
          textAlign: "left",
          marginTop: "5px",
          marginBottom: "5px",
          fontFamily: 'monospace',
          whiteSpace: 'pre-line',
        }}
        onChangeText={setCodePreviewText}
        value={codePreviewText}
        multiline={true}
      />

      Input name of file to be uploaded to cloud storage here (file name should not have an extension at the end)
      <input 
      value = {uploadfileTitle}
      onChange={e => setUploadFileTitle(e.target.value)}
      />

      <Button
        className="upload-buttons"
        onClick={() => {
          uploadCSourceCodeFile(uploadfileTitle, codePreviewText);
        }}
      >
        Save Current Code Preview Text as .c File
      </Button>

      <Button
        className="upload-buttons"
        onClick={() => {
          uploadCPlusPlusSourceCodeFile(uploadfileTitle, codePreviewText);
        }}
      >
        Save Current Code Preview Text as .cpp File
      </Button>

      Input name of parsed code file to be uploaded to cloud storage here (file name should not have an extension at the end)
      <input 
      value = {parsedCodeTitle}
      onChange={e => setParsedCodeTitle(e.target.value)}
      />

      <Button
        className="upload-buttons"
        onClick={() => {
          const parsed = JSON.stringify(parseCCode(codePreviewText));
          console.log('Parsed Data:', parsed);
          uploadParsedCode(parsedCodeTitle, parsed);
        }}
      >
        Reparse Current Code and Upload Parsed Code to Cloud
      </Button>

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
