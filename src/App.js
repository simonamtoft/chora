import React, { Component } from "react";
import "./css/App.css";

//import Registers from "./work_logic/Processor/Registers";
import UserEditor from "./front_end/UserEditor";
import UserButtons from "./front_end/UserButtons";

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

    stepInst = () => {

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

    runInst = () => {
        let que = this.state.instructions;
        let queLength = que.split(/\r\n|\r|\n/).length;
        
        if ( que === "" || que == null) {
            console.log("Error: Instruction queue is empty.");
        } else if (this.state.instCount === queLength) {
            console.log("Error: All instructions already executed");
        } else {

            // Execute remaining instructions
            for (let i = this.state.instCount; i < queLength; i++) {
                this.stepInst();
            }

        }
    }

    resetInst = () => {
        this.setState({type : "", rd: "", r1: "", op2: "", instCount: 0});
        console.log("Reset");
    }

    render() {
        return (
            <div>
                <UserEditor parentCallback = {this.getUserInput}/>

                <UserButtons 
                    stepInst = {this.stepInst} 
                    runInst = {this.runInst}
                    resetInst = {this.resetInst}
                />      
            </div>
        );
    }
}

export default App;
