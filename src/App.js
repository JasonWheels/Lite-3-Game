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
      if (this.state.green.includes(i.toString())){
        console.log("green class", i)
        classChooser = 'green'
      }
      if (this.state.red.includes(i.toString())) {
        console.log("red class", i)
        classChooser = 'red'
      }
      gameGrid.push(<div id={i} className={classChooser} onClick={(event) => {this._handleClick(event)}}><p>{i}</p></div>)
    }
    return gameGrid
  }

  _handleClick(event) {
    if (this.state.red.includes(event.target.id.toString()) || this.state.green.includes(event.target.id.toString())){
      console.log('clicked on a spot that is already taken')
      return 'invalid click'
    }
    let clickID = event.target.id
    // let newColor = this.state.greenTurn ? this.state.green : this.state.red
    if (this.state.greenTurn && !this.state.red.includes(event.target.id.toString()) && !this.state.green.includes(event.target.id.toString())){
      let newGreen = this.state.green.slice(0,2)
      newGreen.unshift(clickID)
      this.setState({
        green: newGreen
      },
      () => {
        for (let i = 0; i < this.state.green.length; i++){
          console.log(this.state.green[i])
        }
      })
    }
    else {
      let newRed = this.state.red.slice(0,2)
      newRed.unshift(clickID)
      this.setState({
        red: newRed
      })
    }
    this.setState({
      greenTurn: !this.state.greenTurn
    })
    
    console.log(this.state.green)
    console.log(this.state.red)
    console.log(`Green Move List: ${this.state.green}`)
    console.log(`Red Move List: ${this.state.red}`)
  }

  render() {
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
