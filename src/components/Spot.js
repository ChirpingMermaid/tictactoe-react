import React from 'react';
import '../css/Board.css';

function Spot({ handleMove, rowIndex, colIndex, data}) {
  return (
    <td onClick={() => handleMove(rowIndex, colIndex)}>
      {data}
    </td>
  );
}

export default Spot;