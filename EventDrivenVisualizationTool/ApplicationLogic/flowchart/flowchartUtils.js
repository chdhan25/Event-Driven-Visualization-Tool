export function generateFlowchartData(parsedData) {
  const nodes = [];
  const edges = [];
  const nodeSpacingY = 150;
  const isrStartX = 100; // X position for ISRs
  const functionStartX = 400; // X position for other flowchart elements
  let currentYISR = 50; // Y position for ISR nodes
  let currentYFunction = 50; // Y position for other flowchart elements

  // Process ISR nodes
  if (parsedData && parsedData.isrs) {
    parsedData.isrs.forEach((isr, index) => {
      const nodeId = `isr-${index}`;
      nodes.push({
        id: nodeId,
        type: 'ISR',
        data: { label: `${isr.type} - ${isr.name}` },
        position: { x: isrStartX, y: currentYISR },
        style: { backgroundColor: 'lightblue', color: 'black' },
      });
      currentYISR += nodeSpacingY; // Position the next ISR node
    });
  }

  // Process flowchart elements (operations, assignments, etc.)
  if (parsedData && parsedData.flowchartElements) {
    parsedData.flowchartElements.forEach((element, index) => {
      const nodeId = `flowchart-${index}`;
      let style;

      // Style nodes based on their type
      if (element.type === 'Process') {
        style = { backgroundColor: 'lightgreen', color: 'black' };
      } else if (element.type === 'End') {
        style = { backgroundColor: 'lightpink', color: 'black' };
      } else {
        style = { backgroundColor: '#f0f0f0', color: 'black' }; // Default
      }

      nodes.push({
        id: nodeId,
        type: element.type,
        data: { label: element.description },
        position: { x: functionStartX, y: currentYFunction },
        style,
      });

      if (index > 0) {
        edges.push({
          id: `edge-${index - 1}-${index}`,
          source: `flowchart-${index - 1}`,
          target: nodeId,
          animated: true,
        });
      }

      currentYFunction += nodeSpacingY; // Position the next element
    });
  }

  return { nodes, edges };
}
