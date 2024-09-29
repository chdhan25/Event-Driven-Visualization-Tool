import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { TextInput } from 'react-native-web';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage';
import { firebaseConfig } from './firebase';
import { parseCCode } from './parsing/parser';
import './App.css'; // Import the external CSS file

export default function App() {
  //State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  const [codePreviewText, setCodePreviewText] = useState("Upload and select a source code file to view its contents here.");
  const [codePreviewTextColor, setCodePreviewTextColor] = useState("black");
  const [codePreviewBGColor, setCodePreviewBGColor] = useState("white");
  const [uploadfileTitle, setUploadFileTitle] = useState("Code");
  const [downloadFileTitle, setDownloadFileTitle] = useState("Old_Code");
  const [parsedData, setParsedData] = useState(null);
  const [flowchartData, setFlowchartData] = useState(null);
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);

  const app = initializeApp(firebaseConfig);

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

      for (let i = 0; i < isr.connections.length; i++) {
        edges.push({
          source: isr.type,
          target: isr.connections[i],
          label: isr.connections[i],
        });
      }
    });

    console.log(edges);
    setEdges(edges);
    setNodes(nodes);
    return { nodes, edges };
  }

  return (
    <div className="page-container">
      {/* Header Section */}
      <div className="header">
        <h1>Event Driven Visualization Tool</h1>
      </div>

      {/* Upload Section */}
      <div id="upload" style={{ paddingBottom: uploaderBottomPadding }}>
        <Upload.Dragger
          multiple
          action={"https://localhost:3000/"}
          accepts=".c,.cpp"
          listType='text'
          beforeUpload={(file) => {
            message.success(`Source code "${file.name}" uploaded to code pane successfully.`);
            setUploaderBottomPadding(uploaderBottomPadding + 30);
            const reader = new FileReader();
            reader.onload = e => {
              const fileText = e.target.result;
              console.log(fileText);
              setCodePreviewText(fileText);
              const parsed = parseCCode(fileText);
              console.log("Parsed Data:", parsed);
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
      <Button className="upload-buttons">List C Source Files</Button>
      <Button className="upload-buttons">List C++ Source Files</Button>

      <h2>Code Preview Pane (Editable)</h2>
      <Button className="upload-buttons" onClick={() => setCodePreviewBGColor("white")}>Light Mode</Button>
      <Button className="upload-buttons" onClick={() => setCodePreviewBGColor("black")}>Dark Mode</Button>

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
    </div>
  );
}
