import React from 'react';
import {MyHeader} from '../base';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css';

export default class FiveInRow extends React.Component {
  componentWillMount() {
    document.title = "Zhaowei's Front End";
    document.body.style.backgroundColor = "#e6ecf0";
  };
  constructor(props) {
    super(props);
    const boardSize = 15;
    let squares = [];
    for (let i = 0; i < boardSize; i++) {
      squares.push(Array(boardSize).fill(null))
    }
    this.state = {
      boardSize: boardSize,
      xIsNext: true,
      squares: squares
    };
  }
  handleClick(row, col) {
    if (this.state.winner) {
      return;
    }
    let squares = this.state.squares;
    squares[row][col] = this.state.xIsNext? 'X': 'O';
    let winner = null;
    if (calculateWinner(squares, [row, col])) {
      winner = this.state.xIsNext? 'X': 'O';
    }
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      winner: winner
      }
    );
  }
  render() {
    const boardSize = this.state.boardSize;
    const squares = this.state.squares;
    const winner = this.state.winner;
    let message = <h5>Instructions: <small>Put pieces on board in turn. The one who connects five pieces in a row wins</small></h5>;
    if (winner) {
      message = <h5>Winner is {winner}</h5>;
    }
    return(
      <div>
        <MyHeader />
        <div className="container">
          <div className="mt-4">
            <p>{message}</p>
            <Board
              squares={squares}
              boardSize={boardSize}
              onClick={(i, j) => this.handleClick(i, j)}
            />
          </div>`
        </div>
      </div>
    )
  }
}


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {
  renderSquare(row, col) {
    return (
      <Square
        value={this.props.squares[row][col]}
        onClick={() => this.props.onClick(row, col)}
      />
    )
  }
  render () {
    const boardSize = this.props.boardSize;
    let board = [];
    for (let i = 0; i < boardSize; i++) {
      let rowSquares = [];
      for (let j = 0; j < boardSize; j++) {
        rowSquares.push(<div>{this.renderSquare(i, j)}</div>)
      }
      board.push(
        <div className="board-row">
          {rowSquares}
        </div>
      )
    }
    return (
      <div>
        {board}
      </div>
    );

  }
}


function calculateWinner(squares, currentPoint) {
  const boardSize = 15;
  const row = currentPoint[0];
  const col = currentPoint[1];

  // horizontal direction
  let lineLength = 1;
  let rowPointer = row - 1;
  while (rowPointer >= 0) {
    if (squares[row][col] === squares[rowPointer][col]) {
      lineLength++;
      rowPointer--;
    } else {
      break;
    }
  }
  rowPointer = row + 1;
  while (rowPointer < boardSize) {
    if (squares[row][col] === squares[rowPointer][col]) {
      lineLength++;
      rowPointer++;
    } else{
      break;
    }
  }
  if (lineLength === 5) {
    return true;
  }

  // Vertical direction
  lineLength = 1;
  let colPointer = col - 1;
  while (colPointer >= 0) {
    if (squares[row][col] === squares[row][colPointer]) {
      lineLength++;
      colPointer--;
    } else {
      break;
    }
  }
  colPointer = col + 1;
  while (colPointer < boardSize) {
    if (squares[row][col] === squares[row][colPointer]) {
      lineLength++;
      colPointer++;
    } else {
      break;
    }
  }
  if (lineLength === 5) {
    return true;
  }

  // 45 degree Oblique direction
  lineLength = 1;
  rowPointer = row - 1;
  colPointer = col - 1;
  while (rowPointer >= 0 && colPointer >= 0) {
    if (squares[row][col] === squares[rowPointer][colPointer]) {
      lineLength++;
      rowPointer--;
      colPointer--;
    } else {
      break;
    }
  }
  rowPointer = row + 1;
  colPointer = col + 1;
  while (rowPointer < boardSize && colPointer < boardSize) {
    if (squares[row][col] === squares[rowPointer][colPointer]) {
      lineLength++;
      rowPointer++;
      colPointer++;
    } else {
      break;
    }
  }

  if (lineLength === 5) {
    return true
  }

  // 135 degree Oblique direction
  lineLength = 1;
  rowPointer = row - 1;
  colPointer = col + 1;
  while (rowPointer >= 0 && colPointer < boardSize) {
    if (squares[row][col] === squares[rowPointer][colPointer]) {
      lineLength++;
      rowPointer--;
      colPointer++;
    } else {
      break;
    }
  }
  rowPointer = row + 1;
  colPointer = col - 1;
  while (rowPointer < boardSize && colPointer >= 0) {
    if (squares[row][col] === squares[rowPointer][colPointer]){
      lineLength++;
      rowPointer++;
      colPointer--;
    } else {
      break;
    }
  }
  if (lineLength === 5) {
    return true;
  }

  // if none of above matches
  return false;
}

