import React, { Component } from "react";
import "./css/App.css";

//import Registers from "./work_logic/Processor/Registers";
import UserEditor from "./front_end/UserEditor";

class App extends Component {
    constructor() {
        super();

        //let reg = new Registers();

        this.state = {
            instructions: "",
            instCount: 0, 
            inst: {
                type: "",
                rd: "",
                r1: "",
                op2: "",
            },
        };
    }

    getUserInput = (instructions) => {
        this.setState({instructions: instructions});
    }

    executeNextInstruction = () => {

        // Check if there is anything to be executed
        let que = this.state.instructions;
        if ( que === "" || que == null) {
            console.log("Error: Instruction queue is empty.");
            return -1;
        } else if (this.state.instCount === que.split(/\r\n|\r|\n/).length) {
            console.log("Error: All instructions executed.");
            return -1;
        }

        // Increment counter
        this.setState((prevState) => ({
            instCount: prevState.instCount + 1
        }));

        // Decode and set next instruction
        let instnext = que.split("\n")[this.state.instCount];
        let [type, rd, r1, op2] = instnext.split(" ");
        this.setState({type : type, rd: rd, r1: r1, op2: op2});

        // Execute Instruction
        console.log(`Instruction: ${type} ${rd} ${r1} ${op2} executed`);  
    }

    executeInstructions = () => {

        // Check if there is anything to be executed
        let que = this.state.instructions;
        let queLength = que.split(/\r\n|\r|\n/).length;
        if ( que === "" || que == null) {
            console.log("Error: Instruction queue is empty.");
            return -1;
        } else if (this.state.instCount == queLength) {
            console.log("Error: All instructions already executed");
            return -1;
        }
        
        // Execute remaining instructions
        for (let i = this.state.instCount; i < queLength; i++) {
            this.executeNextInstruction();
        }
    }

    resetExecution = () => {
        this.setState({type : "", rd: "", r1: "", op2: "", instCount: 0});
        console.log("Reset");
    }


    render() {
        return (
            <div className="App">
                <UserEditor parentCallback = {this.getUserInput}/>      
                <div>
                    <button onClick={this.executeNextInstruction}>Next</button>
                    <button onClick={this.executeInstructions}>Execute Instructions</button>
                    <button onClick={this.resetExecution}>Reset</button>
                </div>             
            </div>
        );
    }

}

export default App;
