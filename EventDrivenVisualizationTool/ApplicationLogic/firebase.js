import firebase from 'firebase/app';
import {message} from 'antd';
import 'firebase/storage';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  getBytes,
} from 'firebase/storage';
//import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

  /**Firebase API Credenitals. DO NOT CHANGE.*/
export const firebaseConfig = {
    apiKey: "AIzaSyDeHTGsWu5cilfZXwg2f9BhMVis3xDCJoE",
    authDomain: "event-driven-visualization.firebaseapp.com",
    projectId: "event-driven-visualization",
    storageBucket: "event-driven-visualization.appspot.com",
    messagingSenderId: "743645636910",
    appId: "1:743645636910:web:e3ee6cb7bfffbb6899f2bf"
  };

  /**
   * Retrieve the list of flowcharts stored on the cloud and store the list in a state variable
   * @param {function} setter Function used to set the list of flowcharts, String[] is inserted.
   */
  export function findFlowcharts(setter) {
    const storage = getStorage();
    const flowChartRoot = ref(storage, 'Flowcharts');
    const chartList = new Array();
    listAll(flowChartRoot)
    .then((res) => {
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        const flowchartName = itemRef.name.split('.')[0];
        chartList.push(flowchartName);
      });
      console.log("Found Flowcharts: " + chartList);
      setter(chartList);
    }).catch((error) => {
      // Uh-oh, an error occurred!
      message.error(`An error has occured during list retrieval`);
      console.log("Error Log: " + error);
    });
  }

/**
 * List the names of all flowcharts currently saved on the cloud.
 * The list of flowcharts is printed in the browser console.
 */
export function listFlowcharts() {
  const storage = getStorage();
  const flowChartRoot = ref(storage, 'Flowcharts');
  listAll(flowChartRoot)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      console.log('Prefix:');
      console.log(folderRef.name);
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      console.log('Item:');
      console.log(itemRef.name);
    });
    message.info(`Flowchart Names Printed to Browser Console`);
  }).catch((error) => {
    // Uh-oh, an error occurred!
    message.error(`An error has occured during list retrieval`);
  });
}

/**
 * Upload a String containing flowchart data to the cloud as a '.txt' file.
 * After a successful upload, a pop-up will confirm that the upload was completed, and a link to view the
 * file text saved on the cloud is printed in the browser console.
 * @param {string} uploadFolderTitle The name the '.txt' file will be saved under in the cloud. 
 * Do not include '.txt' at the end of the name.
 * @param {string} flowchartData A String containing all of the text of the flowchart data.
 * Flowchart data object must be converted to a String using the JSON.stringify method before being 
 * passed to this function as an argument
 */
export function uploadParsedCode(uploadFolderTitle, flowchartData) {
  const storage = getStorage();
  const uploadTitle = uploadFolderTitle + ".txt";
  const storageRef = ref(storage, `Flowcharts/${uploadTitle}`);
  const stringData = flowchartData;
  const blob = new Blob([stringData], { type: 'Text Document' }); // Create a Blob from the string

  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on('state_changed', (snapshot) => {
    // Handle upload progress
  }, (error) => {
    // Handle upload errors
  }, () => {
    // Handle successful upload
    getDownloadURL(storageRef).then((downloadURL) => {
      console.log('Parsed Code uploaded successfully:', downloadURL);
      message.success(`Parsed Code "${uploadFolderTitle}" uploaded to cloud storage successfully!`);
    });
  });
}

/**
 * Retrieve a text file representing flowchart data from the cloud storage and store its text in a String.
 * @param {string} downloadFolderTitle The name of the flowchart data file to search for.
 * @param {function?} previewSetter Method used to set the flowchart data text preview state variable, String is inserted.
 * @param {function} dataSetter Method used to set the flowchart data state variable, JSON object is inserted.
 */
export function downloadParsedCode(downloadFolderTitle, previewSetter, dataSetter) {
  const storage = getStorage();
  const downloadPath = ref(storage, `Flowcharts/${downloadFolderTitle}.txt`);
  console.log(downloadPath);
  getDownloadURL(downloadPath)
  .then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
    xhr.onload = (event) => {
      const blob = xhr.response;
      previewSetter(blob)
      dataSetter(JSON.parse(blob));
      message.success(`Retrieved flowchart data for "${downloadFolderTitle}".`)
    };
    xhr.open('GET', url);
    xhr.send();
  })
  .catch((error) => {
    // Handle any errors
    switch (error.code) {
      case 'storage/object-not-found':
        message.error("File not found");
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        message.error("You do not have authorization to download this file");
        break;
      case 'storage/canceled':
        // User canceled the upload
        message.error("Download cancelled");
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        message.error("Unknown error occured");
        break;
  }});

  // getBytes(downloadPath)
  // .then((promise) => {
  //   //console.log(promise);
  //   const decoder = new TextDecoder('utf-8');
  //   const fileText = decoder.decode(promise);
  //   console.log("Filetext: " + fileText);
  //   console.log(JSON.parse(fileText));
  //   reply = fileText;
  // })
  // .catch((error) => {
  //   // A full list of error codes is available at
  //   // https://firebase.google.com/docs/storage/web/handle-errors
  //   switch (error.code) {
  //     case 'storage/object-not-found':
  //       message.error("File not found");
  //       // File doesn't exist
  //       break;
  //     case 'storage/unauthorized':
  //       // User doesn't have permission to access the object
  //       message.error("You do not have authorization to download this file");
  //       break;
  //     case 'storage/canceled':
  //       // User canceled the upload
  //       message.error("Download cancelled");
  //       break;

  //     // ...

  //     case 'storage/unknown':
  //       // Unknown error occurred, inspect the server response
  //       message.error("Unknown error occured");
  //       break;
  //   }});
}

// Old Methods Below

  /**
   * List the names of all C Source Code Files currently saved on the cloud.
   * The list of files is printed in the browser console.
   */
export function listCSourceCodeFiles() {
  const storage = getStorage();
  const cSource = ref(storage, 'C_Source_Code_Files');
  // Find all the prefixes and items.
  listAll(cSource)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      console.log('Found folder with name: ' + folderRef.name);
    });
    message.info(`Code File Names Printed to Browser Console`);
  }).catch((error) => {
    // Uh-oh, an error occurred!
    message.error(`An error has occured during list retrieval`);
  });
}

  /**
   * List the names of all C++ Source Code Files currently saved on the cloud.
   * The list of files is printed in the browser console.
   */
export function listCPlusPlusSourceCodeFiles() {
  const storage = getStorage();
  const cPlusPlusSource = ref(storage, 'CPlusPlus_Source_Code_Files');
  // Find all the prefixes and items.
  listAll(cPlusPlusSource)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      console.log('Prefix:');
      console.log(folderRef.name);
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      console.log('Items:');
      console.log(itemRef.name);
    });
    message.info(`Code File Names Printed to Browser Console`);
  }).catch((error) => {
    // Uh-oh, an error occurred!
    message.error(`An error has occured during list retrieval`);
  });
}

/**
 * List the name of all directories stored on the cloud.
 */
export function listDirectories() {
  const storage = getStorage();
  const directories = ref(storage, 'Directories');
  // Find all the prefixes and items.
  listAll(directories)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      console.log(folderRef.name);
    });
    message.info(`Directory Names Printed to Browser Console`);
  }).catch((error) => {
    // Uh-oh, an error occurred!
    message.error(`An error has occured during list retrieval`);
  });
}

  /**
   * Upload a String containing C source code text to the cloud as a '.c' file.
   * After a successful upload, a pop-up will confirm that the upload was completed, and a link to view the
   * file saved on the cloud is printed in the browser console.
   * @param {string} uploadTitle The name the '.c' file will be saved under in the cloud.
   * @param {string} codeText A String containing all of the text of the C Source Code file.
   */
export function uploadCSourceCodeFile(uploadTitle, codeText) {
  const storage = getStorage();
  const uploadFileTitle = uploadTitle + ".c";
  const storageRef = ref(storage, `C_Source_Code_Files/${uploadFileTitle}`);
  const stringData = codeText;
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
      message.success(`File "${uploadFileTitle}" uploaded to cloud storage successfully! Check the browser console for file URL.`);
    });
  });
}

  /**
   * Upload a String containing C++ source code text to the cloud as a '.cpp' file.
   * After a successful upload, a pop-up will confirm that the upload was completed, and a link to view the
   * file saved on the cloud is printed in the browser console.
   * @param {string} uploadTitle The name the '.cpp' file will be saved under in the cloud.
   * @param {string} codeText A String containing all of the text of the C++ source code file.
   */
export function uploadCPlusPlusSourceCodeFile(uploadTitle, codeText) {
  const storage = getStorage();
  const uploadFileTitle = uploadTitle + ".cpp";
  const storageRef = ref(storage, `CPlusPlus_Source_Code_Files/${uploadFileTitle}`);
  const stringData = codeText;
  const blob = new Blob([stringData], { type: 'C++ Source' }); // Create a Blob from the string

  const uploadTask = uploadBytesResumable(storageRef, blob);

  uploadTask.on('state_changed', (snapshot) => {
    // Handle upload progress
  }, (error) => {
    // Handle upload errors
  }, () => {
    // Handle successful upload
    getDownloadURL(storageRef).then((downloadURL) => {
      console.log('String uploaded successfully:', downloadURL);
      message.success(`File "${uploadFileTitle}" uploaded to cloud storage successfully! Check the browser console for file URL.`);
    });
  });
}

/**
 * Upload a directory to the cloud.
 * @param {string} directoryTitle The name that the directory will be saved under in the cloud.
 * @param {File[]} fileArray An array of source code files to be uploaded to the cloud.
 */
export function uploadDirectory(directoryTitle, fileArray) {
  if (fileArray.length < 1) {
    console.log("Cannot upload an empty file array");
    message.error("Cannot upload an empty file array");
    return;
  } if (directoryTitle.length < 1) {
    console.log("Directory must have a title with at least one character");
    message.error("Directory must have a title with at least one character");
    return;
  }
  const storage = getStorage();
  const directoryPath = `Directories/${directoryTitle}`;
  //const directoryPath = ref(storage, `Directories/${directoryTitle}`);
  let successfulUploadCounter = 0;
  for (const sourceFile of fileArray) {
    let fileType = sourceFile.type;
    if (sourceFile.name.endsWith(".c")) {fileType = 'C Source File';}
    else if (sourceFile.name.endsWith(".cpp")) {fileType = 'C++ Source';}
    const metadata = {
      contentType: fileType
    }
    const uploadPath = ref(storage, `${directoryPath}/${sourceFile.name}`);
    const uploadTask = uploadBytesResumable(uploadPath, sourceFile, metadata);
    uploadTask.on('state_changed', (snapshot) => {
      // Handle upload progress
    }, (error) => {
      // Handle upload errors
      console.log(`File "${sourceFile.name}" did not upload successfully`);
      message.error(`File "${sourceFile.name}" did not upload successfully`);
    }, () => {
      // Handle successful upload
      successfulUploadCounter += 1;
      getDownloadURL(uploadPath).then((downloadURL) => {
        console.log(`File "${sourceFile.name}" downloadURL: `, downloadURL);
        message.success(`File "${sourceFile.name}" uploaded to cloud storage successfully! Check the browser console for file URL.`);
      });
    });
  }
  //console.log(`${successfulUploadCounter} files uploaded to cloud successfully`);
  //message.info(`${successfulUploadCounter} files uploaded to cloud successfully`);
  console.log(`Files uploaded to cloud`);
  message.info(`Files uploaded to cloud`);
}

/**
 * Retrieve a C source code file from the cloud storage and store its text in a String.
 * @param {string} downloadFileTitle The name of the source code file to search for.
 * @param {string} reply 
 */
export function downloadCSourceCodeFile(downloadFileTitle, reply) {
  const storage = getStorage();
  const downloadPath = ref(storage, `C_Source_Code_Files/${downloadFileTitle}`);
  console.log(downloadPath);
  console.log(getDownloadURL(downloadPath));
  getDownloadURL(downloadPath)
  .then((url) => {
    console.log(url);
    // Insert url into an <img> tag to "download"
    fetch(url)
    .then((response) => response.text())
    .then((response) => {
      console.log("C File Download Success", response);
      //setCodePreviewText(response);
      message.success(`File "${downloadFileTitle}" downloaded successfully!`);
      //return response;
      reply = response;
    })
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        message.error("File not found");
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        message.error("You do not have authorization to download this file");
        break;
      case 'storage/canceled':
        // User canceled the upload
        message.error("Download cancelled");
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        message.error("Unknown error occured");
        break;
    }
    //return "Error, please try again";
    reply = "Error, please try again";
  });
}

/**
 * Retrieve a C++ source code file from the cloud storage and store its text in a String.
 * @param {string} downloadFileTitle The name of the source code file to search for.
 * @param {string} reply 
 */
export function downloadCPlusPlusSourceCodeFile(downloadFileTitle, reply) {
  const storage = getStorage();
  const downloadPath = ref(storage, `CPlusPlus_Source_Code_Files/${downloadFileTitle}`);
  console.log(downloadPath);
  console.log(getDownloadURL(downloadPath));
  getDownloadURL(downloadPath)
  .then((url) => {
    console.log(url);
    // Insert url into an <img> tag to "download"
    fetch(url)
    .then((response) => response.text())
    .then((response) => {
      console.log("C++ File Download Success", response);
      //setCodePreviewText(response);
      message.success(`File "${downloadFileTitle}" downloaded successfully!`);
      //return response;
      reply = response;
    })
  })
  .catch((error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object-not-found':
        message.error("File not found");
        // File doesn't exist
        break;
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        message.error("You do not have authorization to download this file");
        break;
      case 'storage/canceled':
        // User canceled the upload
        message.error("Download cancelled");
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        message.error("Unknown error occured");
        break;
    }
    //return "Error, please try again";
    reply = "Error, please try again";
  });
}

/**
 * Downloads the files from a given directory, and adds them to a given file array.
 * @param {string} directoryTitle The name of the directory to retrieve files from.
 * @param {File[]} downloadTarget The array to append the retrieved files to.
 */
export function downloadDirectory(directoryTitle, downloadTarget) {
  const storage = getStorage();
  const directoryPath = (`Directories/${directoryTitle}`);
  const directoryRef = ref(storage, directoryPath);
  // Find all the prefixes and items.
  listAll(directoryRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
      console.log('Prefix:');
      console.log(folderRef.name);
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
      console.log('File: ' + itemRef.name);
      console.log(itemRef);
      getBytes(itemRef)
      .then((promise) => {
        console.log(promise);
        const decoder = new TextDecoder('utf-8');
        const fileText = decoder.decode(promise);
        console.log(fileText);
        //let nextFile = new File([fileText], itemRef.name, {type: "text/plain",});
        //console.log(nextFile);
        //downloadTarget.push(nextFile);
        downloadTarget.push(new File([fileText], itemRef.name, {type: "text/plain",}));
      });
    });
    message.info(`Files of directory "${directoryTitle}" have been downloaded`);
  }).catch((error) => {
    // Uh-oh, an error occurred!
    message.error(`An error has occured during list retrieval`);
  });
}