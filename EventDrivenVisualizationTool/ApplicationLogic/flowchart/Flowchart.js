import React, { useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

const Flowchart = ({ nodes, edges }) => {
  const { fitView } = useReactFlow();

  // Fit the view when the component loads
  useEffect(() => {
    fitView({ padding: 0.1, includeHiddenNodes: true });
  }, [fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView // Automatically fit the view when the flowchart is loaded
      fitViewOptions={{ padding: 0.1 }}
      defaultZoom={1.5} // Set an initial zoom level
    >
      <Background gap={16} />
      <Controls />
    </ReactFlow>
  );
};

export default Flowchart;
