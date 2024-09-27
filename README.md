# JIB-4116: Event Driven Visualization Tool
This tool can automatically convert C and C++ source code files into flowcharts that support editing, cloud storage, and version control. The purpose of these flowcharts is to provide a high-level view of code files to help new hires gain an understanding of legacy code files.

# Release Notes
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
