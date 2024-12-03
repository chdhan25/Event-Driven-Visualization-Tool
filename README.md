# JIB-4116: Event Driven Visualization Tool
This tool can automatically convert C and C++ source code files into flowcharts that support editing, cloud storage, and version control. The purpose of these flowcharts is to provide a high-level view of code files to help new hires gain an understanding of legacy code files.

# Release Notes

### All Features
* Repository and Upload Ability
* Code Previewing Page
* Event Driven Visualization
* Save Visualization to Firebase
* Retreive Visualization from Firebase
* Visualizations saved to Firebase support version control.

### Known Issues
* Whenever a directory is uploaded on the application's upload page, the app's internal file list is reset. In other words, you cannot upload one folder of source code files, and then add to the internal filelist by uploading a second folder without deleting the files received from the first upload. All of the desired upload files need to be placed within one directory (all source code files placed within directories that are themselves stored in the upload directory are still uploaded).

### Bugs that have occured throughout
* The app used to crash whenever a very large group of files was uploaded. The app can now better handle larger uploads, but large file lists still cause slowdown.
