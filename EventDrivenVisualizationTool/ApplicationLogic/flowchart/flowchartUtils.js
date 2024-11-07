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
        position: { x: startX, y: currentY },
        style: { backgroundColor: 'lightblue', color: 'black' }, // ISR node color
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

  // Handle flowchart elements (operators, assignments, etc.)
  if (parsedData && parsedData.flowchartElements) {
    parsedData.flowchartElements.forEach((element, index) => {
      const nodeId = `flowchart-${index}`;
      let style;

      // Set node color based on element type
      if (element.type === 'assignment') {
        style = { backgroundColor: 'lightgreen', color: 'black' }; // Assignment color
      } else if (element.type === 'operator') {
        style = { backgroundColor: 'lightcoral', color: 'black' }; // Operator color
      }

      nodes.push({
        id: nodeId,
        type: element.type,
        data: { label: element.description },
        position: { x: startX, y: currentY },
        style, // Apply the custom style
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

  return { nodes, edges };
}
