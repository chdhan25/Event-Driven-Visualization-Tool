import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message } from 'antd'
import { TextInput } from 'react-native-web';

const PreviewPane = (props) => {

const [fileList, setFileList] = [props.fileArray, props.fileArraySetter];



   return (
   <div>
   <aside>
    <h4>Files (Click on a File's Listing to Preview its text)</h4>
  
    
    </aside>
    <div className='previewPane'>
    <TextInput
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
    </div>
    );
};


export default PreviewPane;



