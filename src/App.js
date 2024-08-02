import React, { useState } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
  const [csvData, setCsvData] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
    });
  };

  return (
    <div className="app-container" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h1>CSV Previewer</h1>
      {csvData.length === 0 ? (
        <div className="drop-zone">
          <p>Drag and drop a CSV file here</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;