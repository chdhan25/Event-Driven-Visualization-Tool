import React from 'react'
import { Modal } from 'antd'

const cloudFileSelectionScreenTooltip = () => {
    Modal.info({
        title: 'How to Use the Cloud File Selection Screen',
        content: (
          <div>
            <h2>Retrieve the List of Flowcharts Currently Saved on the Cloud</h2>
            <ol>
              <li>Click on the "Retrieve Flowcharts from Cloud" button to refresh the app's
                list of Flowcharts that can be found on the cloud.
              </li>
              <li>After clicking on this button, a button will appear for each flowchart
                data file that was found on the cloud.
              </li>
            </ol>

            <h2>Download the Data for a Saved Flowchart</h2>
            <ol>
              <li>Click on a listing for a flowchart to open its version list.</li>
              <li>The version list contains all of the current versions of the flowchart saved on the cloud.</li>
              <li>Each version is marked using a String that contains the date and time down to the millesecond
                when the flowchart was saved in UTC time. Click on a version listing to download its data
                from the cloud.
              </li>
              <li>After a successful download, a String representation of the selected flowchart's
                data will appear in the preview pane below the listings.
              </li>
              <li>After downloading a flowchart's data, you can click on the "Continue" button at the
                bottom of this screen to proceed to the visualization screen using the selected flowchart's data,
                or you can click on the Back (left-pointing arrow) button in the top-left corner of this screen
                to go back to the upload page.
              </li>
            </ol>
          </div>
        ),
        onOk() {},
        width: 1000
    });
}

export default cloudFileSelectionScreenTooltip