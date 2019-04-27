import React from 'react';
import Spot from './Spot';
import '../css/Board.css';

function Row({ rowIndex, rowData, handleMove }) {
  return (
    <tr>
      {rowData.map((data, i) => (
        <Spot 
          handleMove={handleMove}
          rowIndex={rowIndex} 
          colIndex={i} 
          data={data} 
          key={i} 
        />
      ))}
    </tr>
  );
}

export default Row;