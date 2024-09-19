import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { Upload, Button, Flex, message } from 'antd';
import { useState } from 'react';
import { parseCCode } from './parsing/parser';
import React, { useEffect } from 'react';
// import mermaid from 'mermaid';
// import {Flowchart} from './Flowchart/Flowchart';

// import { initializeApp } from 'firebase/app';
// import { getStorage, ref, uploadBytes, uploadBytesResumable, uploadString, getDownloadURL } from 'firebase/storage';
// import { firebaseConfig } from './firebase';


export default function App() {
  //State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  const [codePreviewText, setCodePreviewText] = useState("Upload and select a source code file to view its contents here.");
  const [codePreviewTextColor, setCodePreviewTextColor] = useState("black");
  const [codePreviewBGColor, setCodePreviewBGColor] = useState("white");
  // const [fileTitle, setFileTitle] = useState("Title.c");
  const [parsedData, setParsedData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);

  // const app = initializeApp(firebaseConfig);

  useEffect(() => {
    if (parsedData) {
    const data = parsedData;
    const flowData = generateFlowchartData(data);
    setFlowchartData(flowData);
    }
  }, [parsedData]);



  function generateFlowchartData(parsedData) {
    const nodes = [];
    const edges = [];

    parsedData.isrs.forEach(isr => {
      nodes.push({ id: isr.type, name: isr.name });

      for (let i =0; i < isr.connections.length; i++) {
        edges.push({
          source: isr.type,
          target: isr.connections[i],
          label: isr.connections[i],
        });
      }

      //implementation for more connection logic for other types of nodes (functions and such) would go below once we have the parser logic for it

    });

    

    // console.log(nodes);
    console.log(edges);
    setEdges(edges);
    setNodes(nodes);

  
    return { nodes, edges };
  }
  
  return (
    
    <div
        style = {{
            //Page Properties
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#9FCCE4",
            overflow: 'auto',
        }}
    >
      
      {/* Page Heading Properties */}
      <div id ="heading"
        style = {{
            fontSize: "20px",
            height: "10%",
            textAlign: "center",
            marginBottom: "10px",
        }}
      >
        <h1>Event Driven Visualization Tool</h1>
      </div>
      {/* File Upload Component */}
      <div id = "upload"
        style = {{
            width: "80%",
            height: "60%",
            padding: "20px",
            paddingBottom: uploaderBottomPadding,

            textAlign: "center",
            marginTop: "20px",
            backgroundColor: "white",
            borderRadius: "20px",
        }}
      >
          <Upload.Dragger
            multiple
            action={"https://localhost:3000/"} //URL to upload files to
            accepts=".c,.cpp"
            listType='text'

            beforeUpload={(file) => {
                message.success(`Source code "${file.name}" uploaded to code pane successfully.`);
                //Increase the bottom padding length of the containing div after uploading a file
                setUploaderBottomPadding(uploaderBottomPadding + 30);
                // setFileTitle(file.name);

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
            }}

            //To be used after implementing proper uploading
            /*onChange={(response) => {
              if (response.file.status !== 'uploading') {
                console.log(response.file, response.fileList);
              }
              if (response.file.status === 'done') {
                message.success(`File "${response.file.name}" uploaded successfully.`);
              } else if (response.file.status === 'error') {
                message.error(`Upload of File "${response.file.name}" has failed.`)
              }
            }}*/

            onRemove={(file) => {
              //Decrease the bottom padding length of the containing div after removing a file
              setUploaderBottomPadding(uploaderBottomPadding - 30);
              message.warning(`File "${file.name}" deleted.`);
            }}

            //To be used after implementing proper uploading
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
            }}*/

            >
            <p> Drag files here </p>
            <p> OR </p>
            
            <Button> Click Upload </Button>
          </Upload.Dragger>
          
      </div>
      {/* Code preview pane */}
      {/* Scrollable text view which shows text of uploaded code files */}
      {/* WANT: Whenever a new code file is uploaded, a new tab is created above the code preview
      representing the new file, clicking on the tab for a specific file will change the text inside
      the preview pane to that file's text */}
      <h2>Code Preview Pane (Editable)</h2>

      <Button
        onClick={() => {
          setCodePreviewTextColor("black");
          setCodePreviewBGColor("white");
        }}
      >Light Mode Display</Button>

      <Button
        onClick={() => {
          setCodePreviewTextColor("white");
          setCodePreviewBGColor("black");
        }}
      >Dark Mode Display</Button>

      <Button
        onClick={() => {
          // parse C code using parser
          const parsed = parseCCode(codePreviewText);
          console.log("Parsed Data:", parsed);
          setParsedData(parsed);
        }}
      >
        Reparse Text
      </Button>

      <TextInput
        style = {{
          width: "80%",
          height: "50%",
          minHeight: "200px",
          padding: "20px",
          overflow: 'auto',
  
          textAlign: "left",
          marginTop: "5px",
          marginBottom: "5px",
          backgroundColor: codePreviewBGColor,
          fontFamily: 'monospace',
          color: codePreviewTextColor,
          whiteSpace: 'pre-line',
        }}
        onChangeText={setCodePreviewText}
        value={codePreviewText}
        multiline={true}
      >

      {/* Input name of file to be uploaded to cloud storage here (title should not have an extension at the end)
      <input 
      value = {fileTitle}
      onChange={e => setFileTitle(e.target.value)}
      /> */}

      {/* Upload text button */}
      {/* <Button
      onClick={() => {
        const storage = getStorage();
        const storageRef = ref(storage, `C_Source_Code_Files/"${fileTitle}"`);
        const stringData = codePreviewText;
        const blob = new Blob([stringData], { type: 'C Source File' }); // Create a Blob from the string

        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', (snapshot) => {
          // Handle upload progress
        }, (error) => {
          // Handle upload errors
        }, () => {
          // Handle successful upload
          getDownloadURL(storageRef).then((downloadURL) => {
            console.log('String uploaded successfully:', downloadURL);
            message.success(`File "${fileTitle}" uploaded to cloud storage successfully! Check the browser console for file URL.`);
          });
        });
      }}
      >
        Upload Current Text to Cloud Storage as .c File
      </Button> */}

      

      </TextInput>
      {parsedData && (
              <div>
                <h3>Parsed Data:</h3>
                <pre>{JSON.stringify(parsedData, null, 2)}</pre>
              </div>
            )}

    </div>

  );
}

