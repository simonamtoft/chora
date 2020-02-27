import React, { Component } from "react";
import './css/App.css';

import Registers from './work_logic/Processor/Registers'
import UserEditor from "./front_end/UserEditor";

class App extends Component {
  constructor() {
    super()

    let reg = new Registers()

    this.state = {
      editor: ''
    }
  }

  getUserInput = (instructions) => {
    this.setState({editor: instructions})
  }
  
  render() {
    return (
      <div className="App">
        <UserEditor parentCallback = {this.getUserInput}/>
        <p>App ser: {this.state.editor}</p>
      </div>
    );
  }
  
}

export default App
