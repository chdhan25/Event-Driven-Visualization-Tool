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
  listDirectories,
  uploadCSourceCodeFile,
  uploadCPlusPlusSourceCodeFile,
  downloadCSourceCodeFile,
  downloadCPlusPlusSourceCodeFile,
  downloadDirectory,
  uploadParsedCode,
  uploadDirectory,
} from '../../ApplicationLogic/firebase';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { parseCppCode } from '../../ApplicationLogic/parsing/cppParser';
import { useNavigation } from '@react-navigation/native';
import './Upload.css'; // Import the external CSS file
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';
import '../../Screens/UploadScreen/Upload.css';
import DropZone from '../../components/DropZone';

export default function UploadScreen() {
  // State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(260);
  const [fileUploaded, setFileUploaded] = useState(false); // Track upload state
  const [codePreviewText, setCodePreviewText] = useState(
    'Upload and select a source code file to view its contents here.'
  );
  const [uploadFileArray, setuploadFileArray] = useState(new Array());
  const [uploadDirectoryTitle, setUploadDirectoryTitle] =
    useState('uploadFolder');
  const [downloadDirectoryTitle, setDownloadDirectoryTitle] =
    useState('downloadFolder');
  const [uploadfileTitle, setUploadFileTitle] = useState('Code');
  const [downloadFileTitle, setDownloadFileTitle] = useState('Old_Code');
  const [parsedCodeTitle, setParsedCodeTitle] = useState('Flowchart');
  const [codePreviewTextColor, setCodePreviewTextColor] = useState('black');
  const [codePreviewBGColor, setCodePreviewBGColor] = useState('white');
  const [parsedData, setParsedData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);
  const [uploadedCode, setUploadedCode] = useState(''); // State to store the uploaded code
  const [cFiles, setCFiles] = useState(new Array());
  const [cppFiles, setCppFiles] = useState(new Array());
  const [parsedC, setParsedC] = useState(new Array());
  const [parsedCpp, setParsedCpp] = useState(new Array());

  const [dropzoneFileList, setDropzoneFileList] = useState([]);

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    if (parsedData) {
      const flowData = generateFlowchartData(parsedData);
      console.log('Generated Flowchart Data:', flowData);
      setFlowchartData(flowData);
      console.log('parsed data in useEffect', parsedData);
    }
  }, [parsedData]);

  const handleContinue = () => {
    if (flowchartData) {
      navigation.navigate('VisualizationSelector', {
        flowchartData: flowchartData,
        uploadedCode: codePreviewText, // This is the file content to show in CodeEditor
      });
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

  const handleDirectoryUpload = (directoryFile, directoryFileList) => {
    console.log(directoryFileList);
    setUploaderBottomPadding(
      uploaderBottomPadding + 30 * directoryFileList.length
    );
    const extension = directoryFile.name.split('.').pop().toLowerCase();
    if (extension === 'c') {
      cFiles.push(directoryFile);
    } else if (extension === 'cpp') {
      cppFiles.push(directoryFile);
    }

    console.log(cFiles);
    console.log(cppFiles);

    uploadFileArray.push(directoryFile);
    console.log(uploadFileArray);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(cFiles);
      console.log(cppFiles);
      const fileText = e.target.result;
      console.log(directoryFile.name);
      console.log('This is  fileText: ' + fileText);

      console.log('This is the extension: ' + extension);
      if (extension === 'c') {
        const parsed = parseCCode(fileText);
        console.log('Parsed Data:', parsed);
        setParsedData(parsed);
      } else if (extension === 'cpp') {
        const parsedCpp = parseCppCode(fileText);
        setParsedData(parsedCpp);
        //this isnt really working so I implemented it properly in the handleFilePreview method
      }

      message.success(`File "${directoryFile.name}" uploaded`);
    };
    reader.readAsText(directoryFile);
  };

  const handleFilePreview = (targetFile) => {
    const extension = targetFile.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      if (extension === 'c') {
        const parsed = parseCCode(fileText);
        setParsedData(parsed);
      } else if (extension === 'cpp') {
        const parsedCpp = parseCppCode(fileText);
        setParsedData(parsedCpp);
      }
      setCodePreviewText(fileText); // Set the file content to preview text
      setUploadedCode(fileText); // Ensure this is passed to FlowchartScreen
      message.info(
        `File "${targetFile.name}" previewed. Text sent to code preview pane.`
      );
    };
    reader.readAsText(targetFile);
  };

  const handleFileRemove = (targetFile) => {
    setUploaderBottomPadding(uploaderBottomPadding - 30);
    const filtered = uploadFileArray.filter((arrayFile) => {
      //console.log("File: " + arrayFile.name);
      //console.log("To Remove: " + targetFile.name);
      //console.log(arrayFile.name != targetFile.name);
      return arrayFile.name != targetFile.name;
    });
    setuploadFileArray(filtered);
    message.info(`File "${targetFile.name}" has been removed.`);
  };
  //I have replaced the method that is run on a file deletion with handleFileRemove
  const handleReUpload = () => {
    //setFileUploaded(false); // Reset the upload state
    setCodePreviewText(
      'Upload and select a source code file to view its contents here.'
    ); // Reset preview text
    setUploaderBottomPadding(20); // Reset padding if needed
  };
// ****************** This is what actually shows up on the screen ******************************************
return (
  <div className="page-container">
    <div className="header" id="heading">
      <h1>Event Driven Visualization Tool</h1>
    </div>

    {/* Dropzone Component */}
    <DropZone 
      fileArray = {dropzoneFileList}
      fileArraySetter = {setDropzoneFileList}
    />

    {/* File Uploader */}
    <div id="upload" >
      {!fileUploaded ? (
        <Upload.Dragger
          multiple
          action="http://localhost:8081/"
          accepts=".c,.cpp"
          listType="text"
          directory="true"
          fileList={uploadFileArray}
          showUploadList={{ showPreviewIcon: true }}
          //beforeUpload={handleFileUpload}
          beforeUpload={(file, fileList) => handleDirectoryUpload(file, fileList)}
          //onPreview={handleFileUpload}
          onPreview={(file) => handleFilePreview(file)}
          //onRemove={handleReUpload}
          onRemove={(file) => handleFileRemove(file)}
        >
          <h3>Drag Files Here</h3>
          <h3>OR</h3>
          <Button>Upload Directory</Button>
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
              width: '80%',
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
    {/*  **uncomment and delete this text when need to test using this button** <Button

          className="upload-buttons"

          onClick={() => {

            console.log('Upload Files: ' + uploadFileArray.length);

            console.log(uploadFileArray);

            for (const sourceFile of uploadFileArray) {

              const reader = new FileReader();

              reader.onload = (e) => {

                const fileText = e.target.result;

                console.log(fileText);

              };

              reader.readAsText(sourceFile);

            }

            message.info(`File Array details printed to browser console`);

          }}

        >

          Preview Upload File List (For Testing Only)

        </Button> */}
{/* **uncomment when need to reset padding. Is this necessary?** <Button

          className="upload-buttons"

          onClick={() => {

            setUploaderBottomPadding(260 + 30 * uploadFileArray.length);

          }}

        >

          Reset Padding

        </Button> */}

    {/* Save Buttons Section */}
    <div id="all-buttons">
    

      {/* Code Options and List Code Sections */}
      <div id="list-code">
      <h2>List Source Code Files Saved on Cloud</h2>
        <Button className="upload-buttons" onClick={() => listDirectories()}>
          List Directories
        </Button>

        
        <Button className="upload-buttons" onClick={() => listCSourceCodeFiles()}>
          List C Source Files
        </Button>
        <Button className="upload-buttons" onClick={() => listCPlusPlusSourceCodeFiles()}>
          List C++ Source Files
        </Button>
        </div>

      {/* Download Code Section */}
      <div id="download-code">
        <h2>Download Source Files</h2>
        <p>
          Input name of source code file to be downloaded and displayed in the code
          preview pane below. File name must include ".c" or ".cpp" extension.
        </p>
        <input
          value={downloadFileTitle}
          onChange={(e) => setDownloadFileTitle(e.target.value)}
        />
        <Button
          className="upload-buttons"
          onClick={() => {
            const reply = '';
            downloadCSourceCodeFile(downloadFileTitle, reply);
            setCodePreviewText(reply);
          }}
        >
          Download C Source Code File
        </Button>
        <Button
          className="upload-buttons"
          onClick={() => {
            const reply = '';
            downloadCPlusPlusSourceCodeFile(downloadFileTitle, reply);
            setCodePreviewText(reply);
          }}
        >
          Download C++ Source Code File
        </Button>
        <p>Input name of directory to be downloaded from cloud</p>
      <input
        value={downloadDirectoryTitle}
        onChange={(e) => setDownloadDirectoryTitle(e.target.value)}
      />
      <Button
        className="upload-buttons"
        onClick={() => downloadDirectory(downloadDirectoryTitle, uploadFileArray)}
      >
        Download Directory
      </Button>
      </div>

      {/* Save Code Section */}
      <div id="save-code">
      <h2>Save Current Code to Cloud</h2>
      <p>Input name of directory to be saved to cloud</p>
      <input
        value={uploadDirectoryTitle}
        onChange={(e) => setUploadDirectoryTitle(e.target.value)}
      />
      <Button
        className="upload-buttons"
        onClick={() => uploadDirectory(uploadDirectoryTitle, uploadFileArray)}
      >
        Save Directory
      </Button>
        
        <Button
          className="upload-buttons"
          onClick={() => uploadCSourceCodeFile(uploadfileTitle, codePreviewText)}
        >
          Save Current Code Preview Text as .c File
        </Button>
        <Button
          className="upload-buttons"
          onClick={() => uploadCPlusPlusSourceCodeFile(uploadfileTitle, codePreviewText)}
        >
          Save Current Code Preview Text as .cpp File
        </Button>
        
      </div>
    </div>
    {/* <p>
      Input name of parsed code file to be uploaded to cloud storage here (file
      name should not have an extension at the end)
    </p>
    <input
      value={parsedCodeTitle}
      onChange={(e) => setParsedCodeTitle(e.target.value)}
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
    </Button> */}
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
