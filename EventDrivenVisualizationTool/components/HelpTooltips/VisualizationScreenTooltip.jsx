import React from 'react'
import { Modal } from 'antd'

const visualizationScreenTooltip = () => {
    Modal.info({
        title: 'How to Use the Visualization Screen',
        content: (
          <div>
           <h2>Viewing and Manipulating the Flowchart</h2>
           <ol>
            <li>In this screen, you can view the flowchart generated from uploaded source code files
              or flowchart data downloaded from the cloud.
            </li>
            <li>Interesting events will be recorded in their own node.</li>
            <li>Click on a node to view additional details, such as the code line(s) in the
              original source code file where the event the node was generated from can be found.
            </li>
            <li>You can move around the visualization by dragging your mouse in the visualization space.</li>
            <li>At the bottom-left corner of the screen, there are 4 buttons that are useful for
              manipulating the visualization view. From top to bottom, these buttons can be used to:
              <ul>
                <li><b>Zoom In Flowchart</b></li>
                <li><b>Zoom Out Flowchart</b></li>
                <li><b>Center View onto the Flowchart</b></li>
                <li><b>"Lock" the Flowchart to prevent changes.
                  Click the lock button again to unlock the flowchart.</b></li>
              </ul>
            </li>
           </ol>

           <h2>View the Color Legend</h2>
           <ol>
            <li>Nodes are color-coded based on the type of event they represent.</li>
            <li>To view a legend of the available colors and their meanings,
              click on the "Show Legend" button in the top-right corner of
              the flowchart space to make the legend visible.
            </li>
            <li>When the legend is visible, the "Show Legend" button changes to "Hide Legend",
              click on "Hide Legend" to make the legend disappear.
            </li>
           </ol>

           <h2>Use the Code Editor</h2>
           <ol>
            <li>To the left of the flowchart space, a code editor is provided.</li>
            <li>This code editor will initially contain the source code used to generate the flowchart.
              If you downloaded flowchart data from the cloud instead of uploading one or more source code files,
              then the code editor will be initially blank instead.
            </li>
            <li>You can edit the code in the editor to your desire, and then click on the "Update" button
              located below the editor to create a new flowchart that is generated from the current text
              in the editor.
            </li>
           </ol>

           <h2>Saving a Flowchart</h2>
           <ol>
            <li>At the header of this screen, there is a field to input a name to save the
              current flowchart under.
            </li>
            <li>After inputting a name, click the "Save to Cloud" button to save the current flowchart
              to the cloud.
            </li>
            <li>If you save a flowchart under a name that is currently being used
            to store one or more flowchart versions saved on the cloud, then you will be given a prompt informing you that
            the name is in use. From this prompt, you can choose to cancel the save operation, to save the current
            flowchart as a new version without affecting pre-existing versions, or deleting all existing versions
            before proceeding to save the current flowchart as the first version of
            a new cloud flowchart.</li>
            <li>To access a saved flowchart, refresh the app to go back to the upload screen.
              From there, click on the "View Flowcharts Saved on Cloud" button towards the bottom of the page,
              and follow the instructions listed under the help tooltip of the Cloud File Selection screen.
            </li>
           </ol>
           <h3 className='warning-text'>Warning: Overwritten flowchart versions cannot be recovered.
           </h3>
          </div>
        ),
        onOk() {},
        width: 1000
    });
}

export default visualizationScreenTooltip