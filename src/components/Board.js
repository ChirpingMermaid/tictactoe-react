import React from 'react';
import Row from './Row';
import '../css/Board.css';

function Board({ board, handleMove, gameText }) {
  return (
    <div id='tictactoe'>
      <table id='board'>
        <tbody>
          {board.map((row, i) => <Row handleMove={handleMove} rowIndex={i} rowData={row} key={i} />)}
        </tbody>
      </table>
      <h2 id='gameText'>{gameText}</h2>
    </div>
  );
}

export default Board;