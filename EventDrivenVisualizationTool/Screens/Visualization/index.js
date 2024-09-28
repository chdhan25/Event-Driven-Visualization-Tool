import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

const Visualization = ({ flowchartData }) => {
  console.log('Flowchart Nodes:', flowchartData.nodes);
  console.log('Flowchart Edges:', flowchartData.edges);

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
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Visualization;
