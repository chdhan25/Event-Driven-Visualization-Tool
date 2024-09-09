import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-web';
// <<<<<<< flowchart
import { Upload, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { parseCCode } from './parsing/parser'; // Your parsing function
import Flowchart from './flowchart/Flowchart'; // Import Flowchart component

export default function App() {
  // =======
  // import { Upload, Button, Flex, message } from 'antd';
  // import { useState } from 'react';
  // import { initializeApp } from 'firebase/app';
  // import { getStorage, ref, uploadBytes, uploadBytesResumable, uploadString, getDownloadURL } from 'firebase/storage';
  // import { firebaseConfig } from './firebase';
  // import { parseCCode } from './parsing/parser';
  // import React, { useEffect } from 'react';
  // // import mermaid from 'mermaid';
  // // import {Flowchart} from './Flowchart/Flowchart';

  // export default function App() {
  //   //State Variables
  //   const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  //   const [codePreviewText, setCodePreviewText] = useState("Upload and select a source code file to view its contents here.");
  //   const [fileTitle, setFileTitle] = useState("Title.c");
  //   const [codePreviewTextColor, setCodePreviewTextColor] = useState("black");
  //   const [codePreviewBGColor, setCodePreviewBGColor] = useState("white");

  //   const app = initializeApp(firebaseConfig);
  // >>>>>>> main
  const [parsedData, setParsedData] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [codePreviewText, setCodePreviewText] = useState(
    'Upload and select a source code file to view its contents here.'
  );
  const [codePreviewTextColor, setCodePreviewTextColor] = useState('black');
  const [codePreviewBGColor, setCodePreviewBGColor] = useState('white');
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);

  useEffect(() => {
    if (parsedData) {
      console.log('Parsed Data:', parsedData);
      const flowData = generateFlowchartData(parsedData);
      console.log('Generated Nodes:', flowData.nodes);
      console.log('Generated Edges:', flowData.edges);
      setNodes(flowData.nodes);
      setEdges(flowData.edges);
    }
  }, [parsedData]);

  // Function to generate flowchart data (Replace with your actual logic)
  function generateFlowchartData(parsedData) {
    const nodes = [];
    const edges = [];
    const seenNodes = new Set();
    const seenEdges = new Set();

    parsedData.isrs.forEach((isr, index) => {
      if (!seenNodes.has(isr.name)) {
        nodes.push({
          id: isr.name,
          data: { label: isr.name },
          position: { x: 250 * index, y: 0 },
          type: 'default',
        });
        seenNodes.add(isr.name);
      }

      isr.connections.forEach((connection, connIndex) => {
        const edgeId = `edge-${isr.name}-${connection}`;
        if (!seenEdges.has(edgeId)) {
          edges.push({
            id: edgeId,
            source: isr.name,
            target: `node-${connIndex}`,
            animated: true,
            label: `Connection: ${connection}`,
          });
          seenEdges.add(edgeId);
        }
      });
    });

    parsedData.flowchartElements.forEach((element, index) => {
      const nodeId = `node-${index}`;
      if (!seenNodes.has(nodeId)) {
        nodes.push({
          id: nodeId,
          data: { label: element.description },
          position: { x: 250 * index, y: 100 },
          type: 'default',
        });
        seenNodes.add(nodeId);
      }

      if (index > 0) {
        const edgeId = `edge-${index}`;
        if (!seenEdges.has(edgeId)) {
          edges.push({
            id: edgeId,
            source: `node-${index - 1}`,
            target: nodeId,
            animated: true,
            label: 'Next Step',
          });
          seenEdges.add(edgeId);
        }
      }
    });

    return { nodes, edges };
  }

  // File upload handling
  const beforeUpload = (file) => {
    message.success(`File "${file.name}" uploaded successfully.`);
    setUploaderBottomPadding(uploaderBottomPadding + 30);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileText = e.target.result;
      setCodePreviewText(fileText);

      // Parse C code using parser
      const parsed = parseCCode(fileText);
      setParsedData(parsed);
    };
    reader.readAsText(file);

    return false; // Prevent automatic upload
  };

  const onRemove = (file) => {
    setUploaderBottomPadding(uploaderBottomPadding - 30);
    message.warning(`File "${file.name}" deleted.`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#9FCCE4',
        overflow: 'auto',
      }}
    >
      <div
        id="heading"
        style={{
          fontSize: '20px',
          height: '10%',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        <h1>Event Driven Visualization Tool</h1>
      </div>
      {/* File Upload Component */}
      <div
        id="upload"
        style={{
          width: '80%',
          height: '60%',
          padding: '20px',
          paddingBottom: uploaderBottomPadding,
          textAlign: 'center',
          marginTop: '20px',
          backgroundColor: 'white',
          borderRadius: '20px',
        }}
      >
        {/* <<<<<<< flowchart */}
        <Upload.Dragger
          multiple={false}
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          listType="text"
        >
          <p> Drag and drop your C code file here </p>
          <p> OR </p>
          <Button> Click to Upload </Button>
        </Upload.Dragger>
        {/* ======= */}
        {/* <Upload.Dragger
            multiple
            //action={"gs://event-driven-visualization.appspot.com"} //URL to upload files to
            accepts=".c,.cpp"
            listType='text'

            beforeUpload={(file) => {
                message.success(`File "${file.name}" uploaded to application successfully.`);
                //Increase the bottom padding length of the containing div after uploading a file
                setUploaderBottomPadding(uploaderBottomPadding + 30);
                setFileTitle(file.name);

                //Read input file, send results to AI to create visualization flowchart
                //Give special interest to visualizing interrupt events
                const reader = new FileReader();
                reader.onload = e => {
                  const fileText = e.target.result;
                  console.log(fileText);
                  setCodePreviewText(fileText);

                  // parse C code using parser
                  const parsed = parseCCode(fileText);
                  console.log("Parsed Data:", parsed);
                  setParsedData(parsed);

                };
                reader.readAsText(file);  

                return false;
            }} */}

        {/* //To be used after implementing proper uploading
            /*onChange={(response) => {
              if (response.file.status !== 'uploading') {
                console.log(response.file, response.fileList);
              }
              if (response.file.status === 'done') {
                message.success(`File "${response.file.name}" uploaded successfully.`);
              } else if (response.file.status === 'error') {
                message.error(`Upload of File "${response.file.name}" has failed.`)
              }
            }}*/}

        {/* onRemove={(file) => {
              //Decrease the bottom padding length of the containing div after removing a file
              setUploaderBottomPadding(uploaderBottomPadding - 30);
              message.warning(`File "${file.name}" deleted.`);
            }} */}

        {/* //To be used after implementing proper uploading
            /*Ideally, after a successful file upload, a link corresponding to the new file 
            should appear which allows the user to switch the text in the 
            code preview pane to that of the selected file.*/
        /*onPreview={(file) => {
              const reader = new FileReader();
                reader.onload = e => {
                  const fileText = e.target.result;
                  setCodePreviewText(fileText);
                };
                reader.readAsText(file);  
            }}*/}

        {/* >
            <p> Drag files here </p>
            <p> OR </p> */}

        {/* <Button> Click Upload </Button>
          </Upload.Dragger>
          
>>>>>>> main */}
      </div>
      {/* Code preview pane */}
      <h2>Code Preview Pane</h2>
      <Button
        onClick={() => {
          setCodePreviewTextColor('black');
          setCodePreviewBGColor('white');
        }}
      >
        Light Mode
      </Button>
      <Button
        onClick={() => {
          setCodePreviewTextColor('white');
          setCodePreviewBGColor('black');
        }}
      >
        Dark Mode
      </Button>
      <TextInput
        style={{
          width: '80%',
          height: '50%',
          minHeight: '200px',
          padding: '20px',
          overflow: 'auto',
          textAlign: 'left',
          marginTop: '5px',
          marginBottom: '5px',
          backgroundColor: codePreviewBGColor,
          fontFamily: 'monospace',
          color: codePreviewTextColor,
          whiteSpace: 'pre-line',
        }}
        value={codePreviewText}
        multiline={true}
        // <<<<<<< flowchart
        editable={false}
      />
      {/* Flowchart rendering */}
      {nodes.length > 0 && edges.length > 0 && (
        <Flowchart nodes={nodes} edges={edges} />
      )}
      {/* ======= */}
      {/* >
      </TextInput> */}
      {/* Input name of file to be uploaded to cloud storage here (title should end with extension ".c")
      <input 
      value = {fileTitle}
      onChange={e => setFileTitle(e.target.value)}
      /> */}
      {/* Upload text button */}
      {/* <Button
      onClick={() => {
        const storage = getStorage();
        const storageRef = ref(storage, `Files/"${fileTitle}"`);
        const stringData = codePreviewText;
        const blob = new Blob([stringData], { type: 'C Source File' }); // Create a Blob from the string

        const uploadTask = uploadBytesResumable(storageRef, blob);
      
        uploadTask.on('state_changed', (snapshot) => { */}
      {/* // Handle upload progress */}
      {/* }, (error) => { */}
      {/* // Handle upload errors */}
      {/* }, () => { */}
      {/* // Handle successful upload */}
      {/* getDownloadURL(storageRef).then((downloadURL) => {
            console.log('String uploaded successfully:', downloadURL);
            message.success(`File "${fileTitle}" uploaded to cloud storage successfully! Check the browser console for file URL.`);
          }); */}
      {/* });
      }} */}
      {/* >
        Upload Current Text to Cloud Storage
      </Button>
      {parsedData && ( */}
      {/* <div>
                <h3>Parsed Data:</h3>
                <pre>{JSON.stringify(parsedData, null, 2)}</pre>
              </div>
            )} */}
      {/* >>>>>>> main */}
    </div>
  );
}
