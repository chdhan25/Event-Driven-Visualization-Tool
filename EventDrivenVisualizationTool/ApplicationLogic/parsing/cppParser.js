// Utility function to check if a line of code contains a likely ISR definition for C++ files
const isISRLineCpp = (line) => {
    const avrPattern = /ISR\s*\(.*\)/; // Matches AVR-style ISR(TIMER1_OVF_vect)
    const armPattern = /\w+_Handler\s*\(.*\)/; // Matches ARM Cortex-style SysTick_Handler()
    const armExtiPattern = /void\s+EXTI\d+_IRQHandler\s*\(.*\)/; // Matches ARM EXTI interrupt handler (e.g., EXTI0_IRQHandler)
  
    // C++ specific additional patterns (though ISR patterns remain similar between C and C++)
    return (
      avrPattern.test(line) || armPattern.test(line) || armExtiPattern.test(line)
    );
  };
  
  // Utility function to clean and extract relevant details from the ISR line for C++ files
  const extractISRDetailsCpp = (line) => {
    const avrMatch = line.match(/ISR\s*\((.*)\)/);
    const armMatch = line.match(/(\w+_Handler)\s*\(.*\)/);
    const extiMatch = line.match(/void\s+(EXTI\d+_IRQHandler)\s*\(.*\)/); // Match EXTI handlers
  
    let isrDetails = { type: 'Unknown', name: 'Unknown', connections: [] };
  
    if (avrMatch) {
      return {
        type: 'AVR',
        name: avrMatch[1].trim(),
        connections: [], // Placeholder for connections
        line: line
      };
    } else if (armMatch) {
      return {
        type: 'ARM',
        name: armMatch[1].trim(),
        connections: [], // Placeholder for connections
        line: line
      };
    } else if (extiMatch) {
      return {
        type: 'ARM',
        name: extiMatch[1].trim(), // Handle EXTI IRQ handlers
        connections: [], // Placeholder for connections
        line: line
      };
    } else {
      return { type: 'Unknown', name: 'Unknown', connections: [] };
    }
  };
  
  // Utility function to map a line to flowchart elements for C++ files
  const mapToFlowchartElementCpp = (line) => {
    // Skip empty or comment lines
    if (line.trim() === '' || line.startsWith('//')) {
      return null; // Ignore empty lines or comment lines
    }
  
    if (isISRLineCpp(line)) {
      return { type: 'Process', description: 'ISR Definition', line: line };
    } else if (line.includes('return')) {
      return { type: 'End', description: 'Return Statement', line: line };
    } else if (line.trim() === '{' || line.trim() === '}') {
      return null; // Ignore block delimiters
    } else {
      // Handle common C++ constructs like class declarations, namespaces, etc.
      if (line.startsWith('class ') || line.startsWith('struct ')) {
        return { type: 'Class', description: 'Class Definition', line: line };
      } else if (line.startsWith('namespace ')) {
        return { type: 'Namespace', description: 'Namespace Definition', line: line };
      } else if (line.includes('::')) {
        return { type: 'Operation', description: 'Class/Namespace Scoped Operation', line: line };
      } else {
        return { type: 'Process', description: 'Operation or Assignment', line: line };
      }
    }
  };
  
  // Main parsing function for C++ files
  export const parseCppCode = (code) => {
    const lines = code.split('\n');
    let parsedData = {
      isrs: [],
      flowchartElements: [], // Collect flowchart elements
    };
  
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      console.log(trimmedLine);
  
      // Check for ISR functions specific to C++
      if (isISRLineCpp(trimmedLine)) {
        const isrDetails = extractISRDetailsCpp(trimmedLine);
        parsedData.isrs.push(isrDetails);
      }

  
      // Map line to flowchart element for C++
      const flowchartElement = mapToFlowchartElementCpp(trimmedLine);
      if (flowchartElement) {
        parsedData.flowchartElements.push(flowchartElement);
      }
    });

    console.log("cpp parser parsed data: " + parsedData);
    return parsedData;
  };
  