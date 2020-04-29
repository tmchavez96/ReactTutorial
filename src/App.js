import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="gameBody">
      <Game />
    </div>
  );
}

function Square(props) {
  
  return (
    <div
    className="square" 
    onClick={() => props.onClick(props.value) }>
      <div className="squareText">
        {props.value}     
      </div>
    </div>
  );
 }


class Board extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      squares: this.props.squares,
      xIsNext: true,
    };
    console.log("Board recieved squares " + this.props.squares)
  }


  renderSquare(i) {
    return (
    <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    console.log(this.props.squares)
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

class Game extends React.Component {
  constructor(props){
    super(props)
    this.state={
      history:[{
        squares:Array(9).fill(null),
      }],
      xIsNext:true,
      stepNumber: 0,
    }
  }
  handleClick(i){
    console.log("in handle click - " + i)
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice()
    if(calculateWinner(squares) || squares[i]){
      console.log("calc return")
      return
    }
    const prevXal = this.state.xIsNext
    squares[i] = prevXal ? "X" : "O";
    console.log(i + " is now " + squares[i])
    this.setState(
      {history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !prevXal,
      stepNumber: history.length,
      }
    );
    console.log(this.state.history)
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0.
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move) => {
      const desc = move ? 
        "Go to move " + move : 
        "Go to start"
        return (
          <li key={move}>
            <button onClick={() =>this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });
    let status;
    if(winner) {
      status = "winner" + winner
    }else{
      status = "Next move is : " + (this.state.xIsNext ? "X" : "O")
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick ={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol> {moves} </ol>
        </div>
      </div>
    );
  }
}

// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default App;
