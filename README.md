# JIB-4116: Event Driven Visualization Tool
This tool can automatically convert C and C++ source code files into flowcharts that support editing, cloud storage, and version control. The purpose of these flowcharts is to provide a high-level view of code files to help new hires gain an understanding of legacy code files.

# Release Notes
## Version 0.2.0
### New Features
* Added functionality to list the names of source code files currently stored on the cloud database.
* Added functionality to save flowcharts to cloud. Right now these flowcharts are represented as Strings, and the user can only save visualizations, not load them from the cloud.
* Added a screen allowing the user to select the type of visualization to use with their parsed code. Right now, only the flowchart option is available.
* Added the ability to edit the code while looking at a flowchart, and have the flowchart update to reflect the updated code.
* Added the ability to pull up information on flowchart nodes, and see which line of the code generated each node.
### Bug Fixes
* Support added for '.cpp' files.
### Known Issues
* The download functionality is supposed to download the text for a source code file from the cloud, log the file's text in the browser console, and copy the downloaded text into the code preview pane. Right now, only the console logging function is working.

## Version 0.1.0
### New Features
* Added functionality to upload '.c' source code files to cloud storage supported by Google Firebase.
* Create a flowchart based on user uploaded '.c' source code file
* Added pop-up messages detailing successful upload
### Bug Fixes
* The code preview shown upon uploading a source code file to the application has been improved. The code now appears in an editable code preview pane instead of an alert box.
* The divider containing the upload dragger will now grow and shrink appropriately when code files are added to or removed from the upload list.
### Known Issues
* The cloud storage upload functionality currently supports only '.c' files. The final version of the tool should be able to support '.c' and '.cpp' files
