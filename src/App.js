import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      evenClick: true,
      stepNumber: 0
    };
  }
  handleOnClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    let squares = history[history.length - 1].squares.slice()
    if (squares[i]) { return }
    let step = this.state.stepNumber + 1
    squares[i] = this.state.evenClick ? 'O' : 'X'
    this.setState({
      history: [...this.state.history, { squares: squares }],
      evenClick: !this.state.evenClick,
      stepNumber: step
    })
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
    })
  }
  render() {
    const history = this.state.history[this.state.stepNumber]
    const winner = calculateWinner(this.state.history[this.state.history.length-1].squares)
    let status = 'The next player is: '+(this.state.evenClick ? 'O' : 'X')
    status = winner?'We have a winner: '+winner : status
    const moves = this.state.history.map((step, move) => {
      const desc = move ? 'go to step #: ' + move : 'go to start'
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })
    return (
      <div className='game'>
        <Board squares={history.squares.slice()} onClick={i => this.handleOnClick(i)} />
        <div className="game-info">
          {status}
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
