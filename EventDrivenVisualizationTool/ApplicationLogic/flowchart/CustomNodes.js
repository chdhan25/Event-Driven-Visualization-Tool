import React from 'react';

// ISR Node
export const ISRNode = ({ data }) => (
  <div
    style={{
      padding: '10px',
      border: '1px solid black',
      background: '#f0f8ff', // Light blue for ISR nodes
    }}
  >
    <strong>ISR: {data.label}</strong>
  </div>
);

// Process Node (Generic operations or assignments)
export const ProcessNode = ({ data }) => (
  <div
    style={{
      padding: '10px',
      border: '1px solid black',
      background: '#d3f8d3', // Light green for generic operations
    }}
  >
    <strong>{data.label}</strong>
  </div>
);

// End Node (e.g., return statements)
export const EndNode = ({ data }) => (
  <div
    style={{
      padding: '10px',
      border: '1px solid black',
      background: '#f8d3d3', // Light red for end nodes
    }}
  >
    <strong>End: {data.label}</strong>
  </div>
);

// Additional node types as needed
