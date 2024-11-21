import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { TextInput } from 'react-native-web';
import { generateFlowchartData } from '../ApplicationLogic/flowchart/flowchartUtils';
import { parseCppCode } from '../ApplicationLogic/parsing/cppParser';
import { parseCCode } from '../ApplicationLogic/parsing/parser';
import { FolderAddOutlined } from '@ant-design/icons';

const DropZone = (props) => {
    const [fileList, setFileList] = [props.fileArray, props.fileArraySetter];
    const dropMethod = props.onDrop;
    const [flowchartData, setFlowchartData] = useState(null);
    const [parsedCpp, setParsedCpp] = useState(new Array());
    const [parsedC, setParsedC] = useState(new Array());
    const [parsedData, setParsedData] = useState(null);
    const onFlowchartDataChange = props.onFlowchartDataChange; // Receive callback from parent
    const onPreviewTextChange = props.onPreviewTextChange;
// Receive callback from parent

    useEffect(() => {
        if (parsedData) {
        const flowData = generateFlowchartData(parsedData);
        console.log('Generated Flowchart Data:', flowData);
        setFlowchartData(flowData);
        console.log('parsed data in useEffect', parsedData);
        onFlowchartDataChange(flowData); // Pass the flowchart data to the parent component

        }
    }, [parsedData]);


    const {getRootProps, getInputProps, open} = useDropzone({
        accept: {
            'text/plain': [".c", ".cpp"]
        },
        noClick: true, //Disable the default click behaviour
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
        className='preview-item'
        onClick={() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileText = e.target.result; 
                const fileName = file.name;
                const extension = fileName.split('.').pop().toLowerCase();
                if (extension === 'c') {
                  const parsed = parseCCode(fileText);
                  setParsedData(parsed);
                } else if (extension === 'cpp') {
                  const parsedCpp = parseCppCode(fileText);
                  setParsedData(parsedCpp);
                }               
                setPreviewTitle(file.name);
                setPreviewText(fileText);
                onPreviewTextChange(fileText); // Pass the file text to the parent component
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
    <div className = "dropspace" {...getRootProps()} onClick={open}>
        <input {...getInputProps({
            webkitdirectory: "true"
        })} />
        {
            <div>
                <h3>Drag and drop files here, or click to select files</h3>
                <FolderAddOutlined 
                className='large-icon'
                />
            </div>
        }
    </div>

    <div className='fileList'>
        <ul>{previewList}</ul>
    </div>
    </section>
    );
};

export default DropZone