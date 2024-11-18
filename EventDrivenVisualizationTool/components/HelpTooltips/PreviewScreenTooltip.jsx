import React from 'react'
import { Modal } from 'antd'

const previewScreenTooltip = () => {
    Modal.info({
        title: 'How to Use the Code Preview Screen',
        content: (
          <div>
            <ol>
              <li>All of the source code files uploaded to the upload screen will appear here.</li>
              <li>Every file is listed with a button, click on a file's listing to view its text in
                the scrollable code preview pane below.
              </li>
              <li>You can click on the "Continue" button at the bottom of this screen to proceed
                to the visualization screen, or you can click on the Back (left-pointing arrow) button in the top-left corner
                of the screen to go back to the upload page.
              </li>
            </ol>
            <h3>Note: The code preview pane only displays code text, it does not allow for the contained text
              to be edited.
            </h3>
          </div>
        ),
        onOk() {},
        width: 1000
    });
}

export default previewScreenTooltip