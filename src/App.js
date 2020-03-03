import React, { Component } from "react";
import "./css/App.css";

//import Registers from "./work_logic/Processor/Registers";
import FrontEnd from "./front_end/FrontEnd"

//export const frontEnd = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);

        //let reg = new Registers();

        this.state = {
			isRunning: false, 
			consoleOutput: "",
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

	addConsoleOutput = (line) => {
		this.setState((prevState) => ({
			consoleOutput: prevState.consoleOutput + line + '\n'
		}));
	}

	checkStep(que, instCount, queLength) {
		// Check if there is anything to be executed
        if ( que === "" || que == null) {
            console.log("Error: Instruction queue is empty.");
            return false;
        } else if (instCount === queLength) {
            console.log("Error: All instructions executed.");
            return false;
		} 
		return true;
	}

    stepInst = () => {
		let que = this.state.instructions;
		let instCount = this.state.instCount;
		let queLength = que.split(/\r\n|\r|\n/).length;

		// Run next instruction if any
		if (this.checkStep(que, instCount, queLength)) {
			
			this.setState((prevState) => ({
				instCount: prevState.instCount + 1,
			}));

			// Decode and set next instruction
			let instnext = que.split("\n")[this.state.instCount];
			let [type, rd, r1, op2] = instnext.split(" ");
			this.setState({type : type, rd: rd, r1: r1, op2: op2});

			// Execute Instruction
			this.addConsoleOutput(`${type} ${rd} ${r1} ${op2}`)
			console.log(`Instruction ${this.state.instCount}: ${type} ${rd} ${r1} ${op2} executed`);
		}
    }

    runInst = () => {
        let que = this.state.instructions;
        let queLength = que.split(/\r\n|\r|\n/).length;
		let instCount = this.state.instCount

		// Run remaining instructions
	}

    resetInst = () => {
		this.setState({consoleOutput: "", type : "", rd: "", r1: "", op2: "", instCount: 0});
        console.log("Reset");
    }

    render() {
        return (
			<div>
				<FrontEnd
					parentCallback={this.getUserInput}
					stepClick = {this.stepInst}
					runClick = {this.runInst}
					resetClick = {this.resetInst}
					consoleOutput = {this.state.consoleOutput}
				/>
            </div>
        );
    }
}

export default App;
