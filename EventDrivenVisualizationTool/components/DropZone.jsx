import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { TextInput } from 'react-native-web';

const DropZone = (props) => {
    const [fileList, setFileList] = [props.fileArray, props.fileArraySetter];
    const dropMethod = props.onDrop;
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'text/plain': [".c", ".cpp"]
        },
        onDrop: acceptedFiles => {
            setFileList(acceptedFiles);
            dropMethod(acceptedFiles);
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
        <ul>{previewList}</ul>
        
    </aside>

    </section>
    );
};

export default DropZone