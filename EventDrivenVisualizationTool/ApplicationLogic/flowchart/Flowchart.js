import React, { useEffect } from 'react';
import ReactFlow, { Controls, Background, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

import { ISRNode, ProcessNode, EndNode } from './CustomNodes';

const Flowchart = ({ nodes, edges }) => {
  const { fitView } = useReactFlow();

  const nodeTypes = {
    ISR: ISRNode,
    Process: ProcessNode,
    End: EndNode,
  };

  useEffect(() => {
    fitView({ padding: 0.1, includeHiddenNodes: true });
  }, [fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.1 }}
      defaultZoom={1.5}
    >
      <Background gap={16} />
      <Controls />
    </ReactFlow>
  );
};

export default Flowchart;
