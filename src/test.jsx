// src/test.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('🔍 Test: React version', React.version);

// Direct render test
const testRoot = document.getElementById('root');
if (testRoot) {
  testRoot.innerHTML = `
    <div style="padding: 50px; text-align: center;">
      <h1 style="color: green">✅ HTML is Loading!</h1>
      <p>If you see this, the page is loading HTML</p>
      <div id="react-test"></div>
    </div>
  `;
  
  // Try to render React
  try {
    const reactRoot = ReactDOM.createRoot(document.getElementById('react-test'));
    reactRoot.render(React.createElement('h2', {style: {color: 'blue'}}, '🎉 React is Working!'));
    console.log('✅ React rendered successfully');
  } catch (error) {
    console.error('❌ React render failed:', error);
  }
}