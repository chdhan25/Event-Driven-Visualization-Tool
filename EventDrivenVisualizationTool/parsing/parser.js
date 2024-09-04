// src/parsing/parser.js

// Utility function to check if a line of code contains a likely ISR definition
const isISRLine = (line) => {
  // Example patterns for different platforms
  const avrPattern = /ISR\s*\(.*\)/; // Matches AVR-style ISR(TIMER1_OVF_vect)
  const armPattern = /\w+_Handler\s*\(.*\)/; // Matches ARM Cortex-style SysTick_Handler()

  return avrPattern.test(line) || armPattern.test(line);
};

// Utility function to clean and extract relevant details from the ISR line
const extractISRDetails = (line) => {
  // Extract ISR name and relevant information
  const avrMatch = line.match(/ISR\s*\((.*)\)/);
  const armMatch = line.match(/(\w+_Handler)\s*\(.*\)/);

  if (avrMatch) {
    return { type: 'AVR', name: avrMatch[1].trim() };
  } else if (armMatch) {
    return { type: 'ARM', name: armMatch[1].trim() };
  } else {
    return { type: 'Unknown', name: 'Unknown' };
  }
};

// Main parsing function
export const parseCCode = (code) => {
  const lines = code.split('\n');
  let parsedData = {
    isrs: [],
    functions: [],
    controlFlows: [],
  };

  lines.forEach(line => {
    const trimmedLine = line.trim();

    // Check for ISR functions
    if (isISRLine(trimmedLine)) {
      const isrDetails = extractISRDetails(trimmedLine);
      parsedData.isrs.push(isrDetails);
    }

    // Add more parsing logic for functions, control flows, etc.
  });

  return parsedData;
};
