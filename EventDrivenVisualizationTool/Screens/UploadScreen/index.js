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
import '../../Screens/UploadScreen/Upload.css';

export default function UploadScreen() {
  // State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  const [fileUploaded, setFileUploaded] = useState(false); // Track upload state
  const [codePreviewText, setCodePreviewText] = useState(
    'Upload and select a source code file to view its contents here.'
  );
  const [uploadFileArray, setuploadFileArray] = useState([]);
  const [uploadfileTitle, setUploadFileTitle] = useState("Code");
  const [downloadFileTitle, setDownloadFileTitle] = useState("Old_Code");
  const [parsedCodeTitle, setParsedCodeTitle] = useState("Flowchart");
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
      // Navigate to the visualization selector screen
      navigation.navigate('VisualizationSelector', { flowchartData });
      
      navigation.navigate('FlowchartScreen', { flowchartData});

      // Navigate to the visualization selector screen with flowchartData and uploadedCode
      navigation.navigate('Flowchart', { flowchartData, uploadedCode });

    } else {
      message.warning('Please upload a valid code file before continuing.');
    }

  };
  //I have replaced the method ran on upload to handleDirectoryUpload
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

  const handleDirectoryUpload = (directoryFile) => {
    console.log(directoryFile);
    setUploaderBottomPadding(uploaderBottomPadding + 50);
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      console.log(fileText);
      message.success(`File "${directoryFile.name}" uploaded`);
    };
    reader.readAsText(directoryFile);
  }

  const handleFilePreview = (targetFile) => {
    console.log("File Name: " + targetFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      console.log(fileText);
      setCodePreviewText(fileText);
      message.info(`File "${targetFile.name}" previewed. Text sent to code preview pane.`)
    };
    reader.readAsText(targetFile.originFileObj);
  }

  const handleFileRemove = (targetFile) => {
    setUploaderBottomPadding(uploaderBottomPadding - 50);
    message.info(`File "${targetFile.name}" has been removed.`);
  }
  //I have replaced the method that is run on a file deletion with handleFileRemove
  const handleReUpload = () => {
    //setFileUploaded(false); // Reset the upload state
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
            action="http://localhost:8081/"
            accepts=".c,.cpp"
            listType="text"
            directory="true"
            showUploadList={{
              showPreviewIcon: true
            }}
            //beforeUpload={handleFileUpload}
            beforeUpload={(file) => handleDirectoryUpload(file)}
            //onPreview={handleFileUpload}
            onPreview={(file) => handleFilePreview(file)}
            //onRemove={handleReUpload}
            onRemove={(file) => handleFileRemove(file)}
          >
            <p>Drag files here</p>
            <p>OR</p>
            <Button>Click Upload</Button>
          </Upload.Dragger>
        ) : (
          <div>
            <h2>Code Preview Pane:</h2>
            {/* <Button
              className="upload-buttons"
              onClick={() => {
                console.log("Upload Files: " + uploadFileArray.length);
                for (const sourceFile of uploadFileArray) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const fileText = e.target.result;
                    console.log(fileText);
                  };
                  reader.readAsText(sourceFile);
                }
              }}
            >
              Preview Upload File List
            </Button> */}

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
