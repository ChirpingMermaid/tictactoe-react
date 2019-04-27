import React,  { useState } from 'react';
import '../css/Form.css';

function Form({ handleNewGame }) {
  //React hook
  const [size, setSize] = useState(3);

  return (
    <div id='form'>
      <span>Size:</span>
        <input type='text' placeholder='#' defaultValue={3} onChange={(e) => setSize(Number(e.target.value))}/>
        <br />
        <button id='newGame' onClick={(e) => handleNewGame(e, size)}>New Game</button>
    </div>
  );
}

export default Form;