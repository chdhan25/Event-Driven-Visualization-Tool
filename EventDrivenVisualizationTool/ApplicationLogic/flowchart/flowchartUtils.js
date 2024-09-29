export function generateFlowchartData(parsedData) {
  const nodes = [];
  const edges = [];
  const nodeSpacingY = 150; // Space between nodes vertically
  const startX = 100; // Starting X position for nodes
  let currentY = 50; // Starting Y position

  // Handle ISRs
  if (parsedData && parsedData.isrs) {
    parsedData.isrs.forEach((isr, index) => {
      const nodeId = `isr-${index}`;
      nodes.push({
        id: nodeId,
        type: 'ISR',
        data: { label: `${isr.type} - ${isr.name}` },
        position: { x: startX, y: currentY }, // Place nodes in a vertical line
      });

      currentY += nodeSpacingY; // Move down for the next node

      if (isr.connections) {
        isr.connections.forEach((connection, connIndex) => {
          edges.push({
            id: `edge-isr-${index}-${connIndex}`,
            source: nodeId,
            target: `node-${connection}-${connIndex}`,
            animated: true,
          });
        });
      }
    });
  }

  // Handle Regular Functions
  if (parsedData && parsedData.functions) {
    parsedData.functions.forEach((func, index) => {
      const nodeId = `func-${index}`;
      nodes.push({
        id: nodeId,
        type: 'Function',
        data: { label: `Function - ${func.name}` },
        position: { x: startX, y: currentY }, // Continue vertical line
      });

      currentY += nodeSpacingY; // Move down for the next node

      if (func.connections) {
        func.connections.forEach((connection, connIndex) => {
          edges.push({
            id: `edge-func-${index}-${connIndex}`,
            source: nodeId,
            target: `node-${connection}-${connIndex}`,
            animated: true,
          });
        });
      }
    });
  }

  // Handle flowchart elements (operations, assignments, etc.)
  if (parsedData && parsedData.flowchartElements) {
    parsedData.flowchartElements.forEach((element, index) => {
      const nodeId = `flowchart-${index}`;
      nodes.push({
        id: nodeId,
        type: element.type,
        data: { label: element.description },
        position: { x: startX, y: currentY }, // Place in vertical order
      });

      currentY += nodeSpacingY; // Move down for the next node

      if (index > 0) {
        // Connect to the previous element
        edges.push({
          id: `edge-flowchart-${index - 1}-${index}`,
          source: `flowchart-${index - 1}`,
          target: nodeId,
          animated: true,
        });
      }
    });
  }

  console.log('Generated Nodes:', nodes);
  console.log('Generated Edges:', edges);

  return { nodes, edges };
}
