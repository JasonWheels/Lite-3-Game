import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    greenMoveList: [],
    redMoveList: [],
    greenTurn: true,
    cssClasses: ['green', 'red', 'available'],
    opacityClasses: ['newest', 'middle', 'oldest'],
    winner: null
  }

  createGrid() {
    const gameGrid = []
    for (let i = 0; i < 9; i++) {
      let classChooser = 'available'
      let opacity = 'newest'
      if (this.state.greenMoveList.includes(i)){
        classChooser = 'green'
        opacity = this.state.opacityClasses[this.state.greenMoveList.indexOf(i)]
        console.log(opacity)
      }
      if (this.state.redMoveList.includes(i)) {
        classChooser = 'red'
        opacity = this.state.opacityClasses[this.state.redMoveList.indexOf(i)]
      }
      gameGrid.push(<div id={i} className={classChooser + ' ' + opacity} onClick={(event) => {this._handleClick(event, this.state.greenTurn, this.state.greenMoveList, this.state.redMoveList)}}></div>)
    }
    return gameGrid
  }

  checkWin(moveSet, color) {
    const moveSetCopy = moveSet.slice()
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [ 2, 5, 8], [0, 4, 8], [2, 4, 6]]
    for (let i = 0; i < winningCombinations.length; i++){
      if (JSON.stringify(moveSetCopy.sort()) === JSON.stringify(winningCombinations[i])) {
        this.setState({winner: color})
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
        let newGreenList = this.state.greenMoveList.slice(0,2)
        newGreenList.unshift(clickID)
        this.checkWin(newGreenList, 'Green')
        this.setState({
          greenMoveList: newGreenList,
          }
        )
      }
      else {
        let newRedMoveList = this.state.redMoveList.slice(0,2)
        newRedMoveList.unshift(clickID)
        this.checkWin(newRedMoveList, 'Red')
        this.setState({
          redMoveList: newRedMoveList,
        }
        )
      }
    }
    this.setState({
      greenTurn: !this.state.greenTurn
    })
  }

  handleReset(){
    this.setState({
      greenMoveList: [],
      redMoveList: [],
      greenTurn: true,
      winner: null
    })
  }

  toggleColorFade() {
    if (this.state.opacityClasses.includes('oldest')) {
      this.setState({opacityClasses: ['newest', 'newest', 'newest']})
    } else {
      this.setState({opacityClasses: ['newest', 'middle', 'oldest']})
    }
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h3>Lite-3 Game</h3>
          {this.state.winner ? <h2>{this.state.winner} is the winner!!!</h2> : <p>A strategic version of Tic-Tac-Toe where only the last 3 moves count.<br/>Try to trap your opponent!</p>}
          {this.state.greenTurn ? <p style={{color: 'green'}}>Green's Move</p> : <p style={{color: 'red'}}>Red's Move</p>}
          <div className="game-grid">
            {this.createGrid()}
          </div>
            <button onClick={() => this.handleReset()}>Reset</button>
            <button onClick={() => this.toggleColorFade()}>Toggle Color Fade</button>
          
        </header>
        <p>Color Fade can be toggled to help show which moves are oldest.</p>
      </div>
    )
  }
}

export default App;

