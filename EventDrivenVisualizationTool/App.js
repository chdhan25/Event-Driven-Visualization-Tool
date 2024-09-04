import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-web';
import { Upload, Button, Flex, message } from 'antd';
import { useState } from 'react';
import { parseCCode } from './parsing/parser';

export default function App() {
  //State Variables
  const [uploaderBottomPadding, setUploaderBottomPadding] = useState(20);
  const [codePreviewText, setCodePreviewText] = useState("Upload and select a source code file to view its contents here.");
  const [codePreviewTextColor, setCodePreviewTextColor] = useState("black");
  const [codePreviewBGColor, setCodePreviewBGColor] = useState("white");
  const [parsedData, setParsedData] = useState(null);
  
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
                message.success(`File "${file.name}" uploaded successfully.`);
                //Increase the bottom padding length of the containing div after uploading a file
                setUploaderBottomPadding(uploaderBottomPadding + 30);

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

