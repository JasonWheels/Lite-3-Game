import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    green: [],
    red: [],
    greenTurn: true,
    cssClasses: ['green', 'red', 'available']
  }

  createGrid() {
    const gameGrid = []
    for (let i = 0; i < 9; i++) {
      let classChooser = 'available'
      if (this.state.green.includes(i)){
        // console.log("green class", i)
        classChooser = 'green'
      }
      if (this.state.red.includes(i)) {
        // console.log("red class", i)
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
      }
    }
  }

  // updateMoveList(newMoveList) {
  //   this.setState({
  //     green: newMoveList
  //   }, this.checkWin(newMoveList)
  //   )
  // }

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
        console.log('newGreen after unshift: ', newGreen)
        this.setState({
          green: newGreen,
          // greenTurn: !this.state.greenTurn
          }, console.log(`Green Move List: ${this.state.green}`)
        )
      }
      else {
        let newRed = this.state.red.slice(0,2)
        newRed.unshift(clickID)
        this.setState({
          red: newRed,
          // greenTurn: !this.state.greenTurn
        }, console.log(`Red Move List: ${this.state.red}`)
        )
      }
      // this.setState({
      //   greenTurn: !this.state.greenTurn
      // })
      
      // console.log(`Green Move List: ${this.state.green}`)
      // console.log(`Red Move List: ${this.state.red}`)
    }
    // console.log('TARGET: ', event.target.id)
    // if (this.state.red.includes(event.target.id) || this.state.green.includes(event.target.id)){
    //   console.log('clicked on a spot that is already taken')
    //   return 'invalid click'
    // }
    // let clickID = event.target.id
    // if (isGreenTurn){
    //   let newGreen = greenMoveSet.slice(0,2)
    //   newGreen.unshift(parseInt(clickID))
    //   this.setState({
    //     green: newGreen
    //     }
    //   )
    // }
    // else {
    //   let newRed = redMoveSet.slice(0,2)
    //   newRed.unshift(parseInt(clickID))
    //   this.setState({
    //     red: newRed
    //   })
    // }
    this.setState({
      greenTurn: !this.state.greenTurn
    })
    
    // console.log(`Green Move List: ${this.state.green}`)
    // console.log(`Red Move List: ${this.state.red}`)
  }

  componentDidUpdate() {
    this.checkWin(this.state.green)
    this.checkWin(this.state.red)
  }

  render() {
    console.log('INSIDE RENDER')
    // let moveList
    // if (this.state.greenTurn) {
    //   this.checkWin(this.state.green)
    // } else {
    //   this.checkWin(this.state.red)
    // }
    // this.checkWin(this.state.green)
    return (
      <div className="App">
        <header className="App-header">
          <div className="game-grid">
            {this.createGrid()}
          </div>
          
        </header>
      </div>
    );
  }
}

export default App;

// JSON.stringify(a1) === JSON.stringify(a2)
