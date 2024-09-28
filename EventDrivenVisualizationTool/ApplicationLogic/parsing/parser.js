// Utility function to check if a line of code contains a likely ISR definition
const isISRLine = (line) => {
  const avrPattern = /ISR\s*\(.*\)/; // Matches AVR-style ISR(TIMER1_OVF_vect)
  const armPattern = /\w+_Handler\s*\(.*\)/; // Matches ARM Cortex-style SysTick_Handler()
  const armExtiPattern = /void\s+EXTI\d+_IRQHandler\s*\(.*\)/; // Matches ARM EXTI interrupt handler (e.g., EXTI0_IRQHandler)

  return (
    avrPattern.test(line) || armPattern.test(line) || armExtiPattern.test(line)
  );
};

// Utility function to clean and extract relevant details from the ISR line
const extractISRDetails = (line) => {
  const avrMatch = line.match(/ISR\s*\((.*)\)/);
  const armMatch = line.match(/(\w+_Handler)\s*\(.*\)/);
  const extiMatch = line.match(/void\s+(EXTI\d+_IRQHandler)\s*\(.*\)/); // Match EXTI handlers

  let isrDetails = { type: 'Unknown', name: 'Unknown', connections: [] };

  if (avrMatch) {
    return {
      type: 'AVR',
      name: avrMatch[1].trim(),
      connections: ['testconnection1', 'testconnection2'], // Placeholder for connections
    };
  } else if (armMatch) {
    return {
      type: 'ARM',
      name: armMatch[1].trim(),
      connections: ['testconnection1', 'testconnection2'], // Placeholder for connections
    };
  } else if (extiMatch) {
    return {
      type: 'ARM',
      name: extiMatch[1].trim(), // Handle EXTI IRQ handlers
      connections: ['testconnection1', 'testconnection2'], // Placeholder for connections
    };
  } else {
    return { type: 'Unknown', name: 'Unknown', connections: [] };
  }
};

// Utility function to map a line to flowchart elements
const mapToFlowchartElement = (line) => {
  // Skip empty or comment lines
  if (line.trim() === '' || line.startsWith('//')) {
    return null; // Ignore empty lines or comment lines
  }

  if (isISRLine(line)) {
    return { type: 'Process', description: 'ISR Definition' };
  } else if (line.includes('return')) {
    return { type: 'End', description: 'Return Statement' };
  } else if (line.trim() === '{' || line.trim() === '}') {
    return null; // Ignore block delimiters
  } else {
    return { type: 'Process', description: 'Operation or Assignment' };
  }
};

// Main parsing function
export const parseCCode = (code) => {
  const lines = code.split('\n');
  let parsedData = {
    isrs: [],
    flowchartElements: [], // Collect flowchart elements
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    // Check for ISR functions
    if (isISRLine(trimmedLine)) {
      const isrDetails = extractISRDetails(trimmedLine);
      parsedData.isrs.push(isrDetails);
    }

    // Map line to flowchart element
    const flowchartElement = mapToFlowchartElement(trimmedLine);
    if (flowchartElement) {
      parsedData.flowchartElements.push(flowchartElement);
    }
  });

  return parsedData;
};
