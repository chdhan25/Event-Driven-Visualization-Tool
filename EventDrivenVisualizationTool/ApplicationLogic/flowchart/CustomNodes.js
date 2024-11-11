import React from 'react';

// ISR Node
export const ISRNode = ({ data }) => (
  <div
    style={{
      padding: '10px',
      border: '1px solid black',
      background: '#f0f8ff',
    }}
  >
    <strong>{data.label}</strong>
  </div>
);

// Process Node (Generic operations or assignments)
export const ProcessNode = ({ data }) => (
  <div
    style={{
      padding: '10px',
      border: '1px solid black',
      background: '#d3f8d3',
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
      background: '#f8d3d3',
    }}
  >
    <strong>{data.label}</strong>
  </div>
);
