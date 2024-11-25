import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, message, Modal } from 'antd'
import { ScrollView, TextInput } from 'react-native-web';
import { useRoute, useNavigation } from '@react-navigation/native';
import { generateFlowchartData } from '../../ApplicationLogic/flowchart/flowchartUtils';
import { parseCppCode } from '../../ApplicationLogic/parsing/cppParser';
import { parseCCode } from '../../ApplicationLogic/parsing/parser';
import { findFlowcharts, downloadParsedCode, retrieveVersionList, downloadVersionFlowchart } from '../../ApplicationLogic/firebase';
import cloudFileSelectionScreenTooltip from '../../components/HelpTooltips/CloudFileSelectionScreenTooltip';
import { CloudSyncOutlined, ForwardOutlined, QuestionCircleTwoTone } from '@ant-design/icons';


const CloudFileSelectionScreen = (props) => {
  
  const route = useRoute();
  const navigation = useNavigation();
  //const { cloudList } = route.params || {};

  const [flowchartPreviewText, setFlowchartPreviewText] = useState("");  
  const [flowchartData, setFlowchartData] = useState(null);
  const [flowchartList, setFlowchartList] = useState(new Array());
  const [parsedCpp, setParsedCpp] = useState(new Array());
  const [parsedC, setParsedC] = useState(new Array());
  const [parsedData, setParsedData] = useState(null);
  const [isVersionListOpen, setIsVersionListOpen] = useState(false);
  const [versionList, setVersionList] = useState(new Array());
  const [currentFlowchart, setCurrentFlowchart] = useState('');

  useEffect(() => {
    //Add help button to header
    navigation.setOptions({
      headerRight: () => (
        <Button 
        className='upload-buttons'
        icon={<QuestionCircleTwoTone/>}
        onClick={() => {cloudFileSelectionScreenTooltip()}}
        >Help</Button>
      ),
    });
  }, [navigation]);

    const handleContinue = () => {
        if (flowchartData) {
            console.log(flowchartData);
            navigation.navigate('VisualizationSelector', {
                flowchartData: flowchartData,
                uploadedCode: '',
            });
        } else {
        message.warning('Please select a flowchart before continuing.');
        }
    };



    const flowchartPreviewList = flowchartList.map(flowchart => (
        <li key={flowchart}>
        <Button
        className='preview-item'
        onClick={() => {
            //downloadParsedCode(flowchart, setFlowchartPreviewText, setFlowchartData);
            retrieveVersionList(flowchart, setVersionList);
            setCurrentFlowchart(flowchart);
            setIsVersionListOpen(true);
            //console.log('Retrieved:', versionList);
        }}
        >
            {flowchart}
        </Button>
        </li>
      ));

      const flowchartVersionList = versionList.map(version => (
        <li key={version}>
          <Button
          className='preview-item'
          onClick={() => {
            //console.log("Original: ", currentFlowchart);
            //console.log("Got:", version);
            downloadVersionFlowchart(currentFlowchart, version, setFlowchartPreviewText, setFlowchartData);
            setIsVersionListOpen(false);
          }}
          >
            {version}
          </Button>
        </li>
      ))

    return (
      <ScrollView>
    <section className = "dropzone">
    {/* Version List Modal */}
    <Modal
      title={`${currentFlowchart} Version List`}
      onCancel={() => {setIsVersionListOpen(false)}}
      open={isVersionListOpen}
      footer={null}
    >
      <ul className='cloudFileList'>{flowchartVersionList}</ul>
    </Modal>
    <aside>
        <h4>Flowcharts (Click on a Flowcharts's Listing to load its contents)</h4>
        <Button 
        icon={<CloudSyncOutlined/>}
        onClick={() => {findFlowcharts(setFlowchartList);}}
        >
          Retrieve Flowcharts from Cloud
        </Button>
        <ul className='cloudFileList'>{flowchartPreviewList}</ul>
        <div className='previewPane'>
        <TextInput
        value={flowchartPreviewText}
        multiline={true}
        readOnly={true}
        style={{ width: '100%', height: '100%', boxSizing: 'border-box', padding: '10px' }}
        />
    </div>
        
    </aside>

    <Button 
    className={flowchartData ? "enabled-button" : "disabled-button"}
    icon={<ForwardOutlined/>}
    iconPosition='end'
    type='primary'
    onClick={handleContinue}>Continue</Button>
    </section>
    </ScrollView>
   
    );
};

export default CloudFileSelectionScreen;