import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { TextInput } from 'react-native-web';

const DropZone = (props) => {
    const [fileList, setFileList] = [props.fileArray, props.fileArraySetter];
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'text/plain': [".c", ".cpp"]
        },
        onDrop: acceptedFiles => {
            setFileList(acceptedFiles);
            message.success("Files Uploaded");
        }
    });
    const [previewTitle, setPreviewTitle] = useState("No File Selected");
    const [previewText, setPreviewText] = useState("Select a file to view its text here");    

    const previewList = fileList.map(file => (
        <li key={file.path}>
        <Button
        onClick={() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileText = e.target.result;
                //console.log(fileText);
                setPreviewTitle(file.name);
                setPreviewText(fileText);
            }
            reader.readAsText(file);
        }}
        >
            {file.path} - {file.size} bytes
        </Button>
        </li>
      ));

    return (
    <section className = "dropzone">
    <div className = "dropspace" {...getRootProps()}>
        <input {...getInputProps()} />
        {
            <h3>Drag and drop files here, or click to select files</h3>
        }
    </div>
    <aside>
        <h4>Files (Click on a File's Listing to Preview its text)</h4>
        <ul>{previewList}</ul>
        
    </aside>
    <div className='previewPane'>
        <h4>{previewTitle}</h4>
        <TextInput
        value={previewText}
        multiline={true}
        readOnly={true}
        style={{
            width: "100%",
            minHeight: "300px",
            height: "max-content",
            border: "1px dashed black",
            fontFamily: "monospace"
        }}
        />
    </div>
    </section>
    );
};

export default DropZone