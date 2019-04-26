import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    green: [],
    red: [],
    greenTurn: true,
    cssClasses: ['green', 'red', 'available'],
    winner: false
  }

  createGrid() {
    const gameGrid = []
    for (let i = 0; i < 9; i++) {
      let classChooser = 'available'
      if (this.state.green.includes(i)){
        classChooser = 'green'
      }
      if (this.state.red.includes(i)) {
        classChooser = 'red'
      }
      gameGrid.push(<div id={i} className={classChooser} onClick={(event) => {this._handleClick(event, this.state.greenTurn, this.state.green, this.state.red)}}><p>{i}</p></div>)
    }
    return gameGrid
  }

  checkWin(moveSet) {
    const moveSetCopy = moveSet.slice()
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [ 2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (let i = 0; i < winningCombinations.length; i++){
      if (JSON.stringify(moveSetCopy.sort()) === JSON.stringify(winningCombinations[i])) {
        console.log('There is a winner!')
        this.setState({winner: true})
      }
    }
  }

  _handleClick(event, isGreenTurn, greenMoveSet, redMoveSet) {
    console.log('TARGET: ', event.currentTarget.id)
    if (isNaN(event.currentTarget.id) || event.currentTarget.id === null) {
      console.log('failed')
      return 'Failed'
    } else if (greenMoveSet.includes(parseInt(event.currentTarget.id)) || redMoveSet.includes(parseInt(event.currentTarget.id))) {
      return 'invalid click'
    }
    else {
      let clickID = parseInt(event.currentTarget.id)
      if (isGreenTurn){
        let newGreen = this.state.green.slice(0,2)
        console.log('newGreen: ', newGreen)
        newGreen.unshift(clickID)
        this.checkWin(newGreen)
        console.log('newGreen after unshift: ', newGreen)
        this.setState({
          green: newGreen,
          }
        )
      }
      else {
        let newRed = this.state.red.slice(0,2)
        newRed.unshift(clickID)
        this.checkWin(newRed)
        this.setState({
          red: newRed,
        }
        )
      }
    }
    this.setState({
      greenTurn: !this.state.greenTurn
    })
  }

  _handleReset(){
    this.setState({
      green: [],
      red: [],
      greenTurn: true,
      winner: false
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h2>Lite-3 Game</h2>
          {this.state.winner ? <h2>There is a winner!!!</h2> : <h4>This game is a strategic version of Tic-Tac-Toe where only the last 3 moves count.<br/>Try to trap your opponent!</h4>}
          <div className="game-grid">
            {this.createGrid()}
          </div>
            <button onClick={() => this._handleReset()}>Reset</button>
          
        </header>
      </div>
    );
  }
}

export default App;

