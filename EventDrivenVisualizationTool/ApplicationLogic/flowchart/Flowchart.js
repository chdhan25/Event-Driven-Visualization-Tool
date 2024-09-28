import React from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

export default function Flowchart({ nodes, edges }) {
  return (
    <div
      style={{
        height: '100%', // Use 100% height of the parent container
        width: '100%', // Use 100% width of the parent container
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#f0f0f0',
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
