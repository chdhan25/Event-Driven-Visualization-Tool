import React from 'react'
import { Modal } from 'antd'

const uploadScreenTooltip = () => {
    Modal.info({
        title: 'How to Use the Upload Screen',
        content: (
          <div>
            <h1>There are Two Methods to Create a Flowchart Visualization</h1>
            <h2>Creating a Flowchart from Uploaded Files:</h2>
            <ol>
              <li>The gray zone in the top component of this screen is a file input. Drag and drop into this file input a folder
                containing all of the C and C++ source code files that you wish to visualize.
                Alternatively, you can click on the file input zone to open the file explorer and select the folder containing the desired files.
              </li>
              <li>After a folder has been uploaded, a set of buttons should appear below the file input zone, these buttons correspond to
                the source code files that were found in the uploaded folder.
              </li>
              {/* This step may be removed or changed after we add support for multi-file visualizations. */}
              <li>Click on the button corresponding to the file that you would like to visualize, then click the "Continue" button to proceed
                to the visualization screen. Alternatively, you can click on the "Preview Repository" button if you wish to view the text in any 
                of the uploaded source code files.
              </li>
            </ol>
            <h3 className='warning-text'>Warning: Uploading a folder will clear any existing uploaded files, please make sure to place all desired files in
              a single directory.
            </h3>
            <h2>Downloading an Existing Flowchart from the Cloud</h2>
            <ul>
              <li>It is also possible to download the data from an existing flowchart saved on the cloud.</li>
              <li>To do so, click on the button "View Flowcharts Saved on Cloud" found
                under the header text "Download Flowchart Data". This will take you to a seperate screen where cloud data
              can be retrieved, more information can be found in the help section located on this screen.</li>
            </ul>
          </div>
        ),
        onOk() {},
        width: 1000
    });
}

export default uploadScreenTooltip