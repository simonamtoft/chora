import React, { Component } from "react";
import "./css/App.css";

//import Registers from "./work_logic/Processor/Registers";
import UserEditor from "./front_end/UserEditor";

class App extends Component {
    constructor() {
        super();

        //let reg = new Registers();

        this.state = {
            editor: "",
            instque: "",
            inst: {
                type: "",
                rd: "",
                r1: "",
                op2: "",
            },
        };
    }

    parseInputToInstruction= () => {
        // Decode next instruction in queue
        let instnext = this.state.instque.split("\n")[0];
        let [type, rd, r1, op2] = instnext.split(" ");

        // Delete first line
        this.setState({instque: this.state.instque.split("\n").slice(1).join("\n")});
        
        // Set state 
        this.setState({type : type, rd: rd, r1: r1, op2: op2});

        console.log(this.state.instque);
    }

    getUserInput = (instructions) => {
        this.setState({editor: instructions, instque: instructions});
    }

    

    render() {
        return (
            <div className="App">
                <UserEditor parentCallback = {this.getUserInput}/>
                <div>Type  rd r1   op2</div>
                <div>{this.state.type} {this.state.rd} {this.state.r1}   {this.state.op2}</div>

                <button onClick={this.parseInputToInstruction}>Convert</button>
            </div>
        );
    }

}

export default App;
