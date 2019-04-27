import React, { Component } from 'react';
import Board from './Board';
import Form from './Form';
import '../css/App.css';

const gameConfig = {
  player1: 'x',
  player2: 'o',
};

const defaultState = {
  board: null,
  count: 0,
  curPlayer: gameConfig.player1,
  gameActive: true,
  gameText: 'Player 1 Start',
  size: 3,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      ...defaultState,
    };
  }

  createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      board.push(Array(size).fill(null));
    }
    return board;
  }

  move(row, col) {
    const { board } = this.state;
    const spot = board[row][col];
    if (!spot) {
      this.setState(({ board, count, curPlayer }) => {
        board[row][col] = curPlayer;
        count++;
        return { board, count };
      }, () => {
        const winner = this.checkSpotForWin(row, col);
        this.toggleTurnOrEndGame(winner);
      });
    }
  }

  checkSpotForWin(row, col) { 
    const { size } = this.state;

    const diag1 = row === col;
    const diag2 = row + col === size - 1;

    const rowWin = this.checkDirection(row, col, 'row');
    const colWin = this.checkDirection(row, col, 'col');
    const diag1Win = diag1 ? this.checkDirection(row, col, 'diag1') : false;
    const diag2Win = diag2 ? this.checkDirection(row, col, 'diag2') : false;
    return rowWin || colWin || diag1Win || diag2Win;
  }

  checkDirection(row, col, type) {
    const { board, size } = this.state;
    const player = board[row][col];
    let j = type === 'diag1' ? 0 : size - 1;

    for (let i = 0; i < size; i++) {
      let spot = null;
      switch(type) {
        case 'row':
          spot = board[row][i];
          break;
        case 'col':
          spot = board[i][col];
          break;
        case 'diag1':
          spot = board[i][j++];
          break;
        case 'diag2':
          spot = board[i][j--];
          break;
        default:
          break;
      }

      if (spot !== player) {
        return false;
      }
    }
    return true;
  }

  toggleTurnOrEndGame(winner = false) {
    const { curPlayer, size, count } = this.state;
    const { player1, player2 } = gameConfig;

    if (winner) {
      if (curPlayer === player1) {
        this.setState({gameActive: false, gameText: 'Player 1 Wins!!!'});
      } else {
        this.setState({gameActive: false, gameText: 'Player 2 Wins!!!'});
      }
    } else {
      if (count === size * size) {
        this.setState({gameText: 'Draw', gameActive: false});
        return;
      }
      if (curPlayer === player1) {
        this.setState({gameText: `Player 2's Turn`, curPlayer: player2});
      } else {
        this.setState({gameText: `Player 1's Turn`, curPlayer: player1});
      }
    }
  }

  handleMove = (row, col) => {
    if (this.state.gameActive) {
      this.move(row, col); 
    }
  }

  handleNewGame = (e, size) => {
    e.preventDefault();
    const board = this.createBoard(size);

    if (size < 3 || isNaN(size)) {
      alert('Please enter a number greater than 3.');
      return;
    }

    this.setState({
      ...defaultState,
      size, 
      board,
    });

  }

  render() {
    return (
      <div className="App">
          <h1>Tic Tac Toe</h1>
          <Form handleNewGame={this.handleNewGame} />
          {
            this.state.board
              ? <Board board={this.state.board} handleMove={this.handleMove} gameText={this.state.gameText} /> 
              : null
          }
      </div>
    );
  }
} 

export default App;
