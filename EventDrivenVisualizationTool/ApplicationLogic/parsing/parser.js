const isISRLine = (line) => {
  const avrPattern = /ISR\s*\((.*)\)/;
  const armPattern = /void\s+(\w+_Handler)\s*\(.*\)/;

  return avrPattern.test(line) || armPattern.test(line);
};

const extractISRDetails = (line) => {
  const avrMatch = line.match(/ISR\s*\((.*)\)/);
  const armMatch = line.match(/void\s+(\w+_Handler)\s*\(.*\)/);

  if (avrMatch) {
    return { type: 'AVR', name: avrMatch[1].trim(), line: line };
  } else if (armMatch) {
    return { type: 'ARM', name: armMatch[1].trim(), line: line };
  }
  return { type: 'Unknown', name: 'Unknown' };
};

export const parseCCode = (code) => {
  const lines = code.split('\n');
  const parsedData = { isrs: [], flowchartElements: [] };

  lines.forEach((line) => {
    if (isISRLine(line)) {
      parsedData.isrs.push(extractISRDetails(line));
    } else if (line.includes('=')) {
      parsedData.flowchartElements.push({
        type: 'Process',
        description: `Assignment:`,
        line: line,
      });
    } else if (line.includes('return')) {
      parsedData.flowchartElements.push({
        type: 'End',
        description: 'Return Statement',
        line: line,
      });
    }
  });

  return parsedData;
};
