export function generateFlowchartData(parsedData) {
  const nodes = [];
  const edges = [];
  const nodeSpacingY = 150;
  const isrStartX = 100; // X position for ISRs
  const functionStartX = 400; // X position for function elements
  let currentYISR = 50; // Y position for ISRs
  let currentYFunction = 50; // Y position for function elements

  // Handle ISRs
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
      currentYISR += nodeSpacingY;
    });
  }

  // Handle function elements
  if (parsedData && parsedData.flowchartElements) {
    parsedData.flowchartElements.forEach((element, index) => {
      const nodeId = `function-${index}`;
      nodes.push({
        id: nodeId,
        type: element.type,
        data: { label: element.description },
        position: { x: functionStartX, y: currentYFunction },
        style: { backgroundColor: 'lightgreen', color: 'black' },
      });

      if (index > 0) {
        // Add edges between function elements
        edges.push({
          id: `edge-function-${index - 1}-${index}`,
          source: `function-${index - 1}`,
          target: nodeId,
        });
      }

      currentYFunction += nodeSpacingY;
    });
  }

  return { nodes, edges };
}
