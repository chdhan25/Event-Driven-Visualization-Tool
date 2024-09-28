import React, { useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

const Flowchart = ({ flowchartData }) => {
  const { nodes, edges } = flowchartData;
  const { fitView } = useReactFlow();

  useEffect(() => {
    fitView({ padding: 0.1, includeHiddenNodes: true });
  }, [fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      defaultZoom={1.5} // Set an initial zoom level (1.5 in this case)
      fitView // Automatically fit the view when the flowchart is loaded
      fitViewOptions={{ padding: 0.1 }} // Optionally adjust the padding for fitting
    >
      <Background gap={16} />
      <Controls />
    </ReactFlow>
  );
};

export default Flowchart;
