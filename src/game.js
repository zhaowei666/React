import React from 'react';
import './index.css';
import {MyHeader} from "./base"

class Game extends React.Component{
  componentWillMount() {
    document.title = 'Tic-tac-toe from Zhaowei'
  };
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X': 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }
  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game Start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner is ' + winner;
    } else {
      status = 'Next player is ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <MyHeader />
        <div class="row container mt-4">
          <div class="col-3">
            <h4>Steps</h4>
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div class="col-5">
            <h4 clss="align-center">Game Board</h4>
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
        </div>
      </div>
    );
  }
}


function Square(props) {
  return (
    <button className="square" onClick={props.onclick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onclick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/* TODO
class PlayerForm extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      playerX: null,
      playerO: null
    }
  }
  render() {
    const playerX = this.state.playerX;
    const playerO = this.state.playerX;
    return (
      <div>
        <p>Player1 (X)</p>
        <input type='text' id='playerX' value={playerX} />
        <p>Player2 (O)</p>
        <input type='text' id='playerY' value={playerO} />
      </div>
    );
  };
}
*/


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[b] && squares[c]) {
      if (squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  }
  return null
}

export default Game;
