import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { TextInput } from 'react-native-web';
import { initializeApp } from 'firebase/app';
import PreviewScreen from '../PreviewScreen';
import CloudFileSelectionScreen from '../CloudFileSelectionScreen';
/*import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from 'firebase/storage';*/
import {
  firebaseConfig,
  listFlowcharts,
  uploadParsedCode,
  downloadParsedCode,
  findFlowcharts,
} from '../../ApplicationLogic/firebase';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { parseCppCode } from '../../ApplicationLogic/parsing/cppParser';
import { useNavigation } from '@react-navigation/native';
import './Upload.css'; // Import the external CSS file
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';
import '../../Screens/UploadScreen/Upload.css';
import DropZone from '../../components/DropZone';
import uploadScreenTooltip from '../../components/HelpTooltips/UploadScreenTooltip';
import { CloudDownloadOutlined, FileSearchOutlined, ForwardOutlined, QuestionCircleTwoTone } from '@ant-design/icons';

export default function UploadScreen() {
  // State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(260);
  const [fileUploaded, setFileUploaded] = useState(false); // Track upload state
  const [codePreviewText, setCodePreviewText] = useState(
    'Upload and select a source code file to view its contents here.'
  );
  const [uploadFileArray, setuploadFileArray] = useState(new Array());
  const [uploadFlowchartTitle, setUploadFlowchartTitle] = useState('');
  const [downloadFlowchartTitle, setDownloadFlowchartTitle] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);
  const [uploadedCode, setUploadedCode] = useState(''); // State to store the uploaded code
  const [cFiles, setCFiles] = useState(new Array());
  const [cppFiles, setCppFiles] = useState(new Array());
  const [parsedC, setParsedC] = useState(new Array());
  const [parsedCpp, setParsedCpp] = useState(new Array());
  const [cloudList, setCloudList] = useState(new Array());
 

  const [dropzoneFileList, setDropzoneFileList] = useState(new Array());

  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    //Add help button to header
    navigation.setOptions({
      headerTitle: "Event Driven Visualization Tool",
      headerTitleAlign: "center",
      headerRight: () => (
        <Button 
        className='upload-buttons'
        icon={<QuestionCircleTwoTone/>}
        onClick={() => {uploadScreenTooltip()}}
        >Help</Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (parsedData) {
      const flowData = generateFlowchartData(parsedData);
      console.log('Generated Flowchart Data:', flowData);
      setFlowchartData(flowData);
      console.log('parsed data in useEffect', parsedData);
    }
  }, [parsedData]);

  const handleCloudFileSelection = () => {
    navigation.navigate('CloudFileSelectionScreen', {});
  }

  const handleContinue = () => {
    if (flowchartData) {
      console.log("This is uploaded code"+ uploadedCode)
      // navigation.navigate('VisualizationSelector', {
      //   flowchartData: flowchartData,
      //   uploadedCode: codePreviewText, // This is the file content to show in CodeEditor
      // });
      navigation.navigate('FlowchartScreen', {
        flowchartData: flowchartData,
        uploadedCode: uploadedCode
      });
    } else {
      message.warning('Please upload a valid code file or download a valid flowchart before continuing.');
    }
  };
  const handlePreview = () => {
    if (flowchartData) {
      console.log(dropzoneFileList); //
      navigation.navigate('Preview', {
        flowchartData: flowchartData,
        uploadedCode: codePreviewText, // This is the file content to show in CodeEditor
        dropzoneFileList: dropzoneFileList,
        parsedData: parsedData, //
      });
    } else {
      message.warning('Please upload a valid code file before continuing.');
    }
  };

  const handleDropzoneUpload = (fileArray) => {
    fileArray.forEach((targetFile) => {
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
      };
      reader.readAsText(targetFile);
      });
  }

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
   
    {/* Dropzone Component */}
    <DropZone 
      className = "dropzone-container"
      fileArray = {dropzoneFileList}
      fileArraySetter = {setDropzoneFileList}
      onDrop = {handleDropzoneUpload}
      onFlowchartDataChange={setFlowchartData} // Pass the callback to update flowchart data
      onPreviewTextChange={setCodePreviewText} // Pass the callback to update

    >
      {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        }) => {
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`
              })}
            >
              <input {...getInputProps()} />
              <span>{isDragActive ? "📂" : "📁"}</span>
              <p>Drag'n'drop images, or click to select files</p>
            </div>
          );
        }}

    </DropZone>


    <h1 className='or'> OR</h1>
        
   
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
      {/* <div id="list-code">
      <h2>List Flowchart Visualizations Saved on Cloud</h2>
        <Button className="upload-buttons" onClick={() => listFlowcharts()}>
          List Flowcharts
        </Button>
      </div> */}

      {/* Download Code Section */}
      <div id="download-code">
        <h2>View Saved Flowcharts</h2>
        <Button
          className="upload-buttons"
          icon={<CloudDownloadOutlined/>}
          onClick={() => {
            handleCloudFileSelection();
          }}
        >
          Download From Cloud
        </Button>

        {/* <Button 
        className="upload-buttons"
        onClick={() => {console.log("Preview: " + flowchartData)}}
        >
          Preview Flowchart Data
        </Button> */}
      </div>

      {/* Save Code Section */}
      {/* <div id="save-code">
        <h2>Save Current Parsed Data to Cloud as a flowchart</h2>
        <p>Input name of flowchart to be saved to cloud</p>
        <input
          value={uploadFlowchartTitle}
          onChange={(e) => setUploadFlowchartTitle(e.target.value)}
        />
        <Button
          className="upload-buttons"
          onClick={() => {
            if (flowchartData) {
              if (uploadFlowchartTitle != '') {
                const parsed = JSON.stringify(flowchartData);
                console.log('Parsed Data:', parsed);
                uploadParsedCode(uploadFlowchartTitle, parsed);
              } else {
                message.error("Please input a name for the flowchart to be uploaded");
              }
              
            } else {
              message.error("Please upload a valid code file or download a valid flowchart before continuing.");
            }
            
          }}
        >
          Save Flowchart Data
        </Button>
      </div> */}
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
      // className="continue-button"
      className={flowchartData ? "enabled-button" : "disabled-button"}
      icon={<ForwardOutlined/>}
      iconPosition='end'
      type="primary"
      onClick={handleContinue}
      style={{ marginTop: '20px' }}
    >
      Continue
    </Button>
    <Button
      className={flowchartData ? "enabled-button" : "disabled-button"}
      icon={<FileSearchOutlined/>}
      iconPosition='end'
      type="primary"
      onClick={handlePreview}
    >
      Preview Repository
    </Button>
  </div>
);
}
