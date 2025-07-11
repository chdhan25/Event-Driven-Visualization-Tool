import React, {useState} from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import '../../Screens/UploadScreen/Upload.css';



import { Modal, Space } from 'antd';
import { SpaceCompactItemContext } from 'antd/es/space/Compact';

const Visualization = ({ flowchartData, parsedData }) => {
  console.log('Flowchart Nodes:', flowchartData.nodes);
  console.log('Flowchart Edges:', flowchartData.edges);
  console.log(parsedData);

  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [selectedNodeLine, setSelectedNodeLine] = useState('');


  const handleModalOk = () => {
    setIsModalVisible(false); // Close the modal
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Close the modal
  };




  const onNodeClick = (event, node) => {
    console.log("this is the line:" + JSON.stringify(node, null, 2))
    setSelectedNodeLine(node.line); // Set the clicked node's line
    setIsModalVisible(true); // Show the modal
    // Perform any necessary actions when a node is clicked
  }

  // Ensure every node has a position
  const nodesWithPosition = flowchartData.nodes.map((node) => ({
    ...node,
    position: node.position || { x: 100, y: 100 }, // Default position if missing
  }));

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow
        nodes={nodesWithPosition} // Ensure nodes have valid positions
        edges={flowchartData.edges} // Pass edges as is
        fitView
        // nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <Modal

        title="Node Details"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {/* <Space style={{justifyContent: 'left'}} width={750}> */}
        <p><strong>Line:  </strong> {selectedNodeLine} </p>
        {/* </Space> */}
      </Modal>
    </div>
  );
};

export default Visualization;
