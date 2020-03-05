import React, { Component } from "react";
import "./css/App.css";

import FrontEnd from "./front_end/FrontEnd"
import CPU from "./work_logic/Processor/CPU"
import { parseInputInst } from './helper';

class App extends Component {
    constructor(props) {
        super(props);

		this.instCount = 0;
        this.state = {
			consoleOutput: "",
            instructions: "",
		};
	}

	cpu = new CPU();

	/**
	 * Sets state.instructions to input
	 * @param {string} 	instructions 	- User input instructions
	 */
    getUserInput = (instructions) => {
        this.setState({instructions: instructions});
    }

	/**
	 * Adds input to consoleOutput and goes to new line
	 * @param {string | number} 	line 	- Line to be added to consoleOutput
	 */
	addConsoleOutput = (line) => {
		this.setState((prevState) => ({
			consoleOutput: prevState.consoleOutput + line + '\n'
		}));
	}

	/**
	 * Check if there is an instruction to be executed
	 * @param {string} 		que 		- All instructions in editor
	 * @param {number}		queLength 	- Number of instructions in total
	 */ 
	checkStep(que, queLength) {
        if ( que === "" || que == null) {
            console.log("Error: Instruction queue is empty.");
            return false;
        } else if (this.instCount === queLength) {
            console.log("Error: All instructions executed.");
            return false;
		} 
		return true;
	}

	/**
	 * Step one instruction, if any left to execute
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
    stepInst = () => {
		let que = this.state.instructions;
		let queLength = que.split(/\r\n|\r|\n/).length;
		
		if (this.checkStep(que, queLength)) {
			let instnext = que.split("\n")[this.instCount];
			let [type, des, s1, s2] = parseInputInst(instnext);
			this.cpu.executeInstruction({pred: 0, type: type, des: des, s1: s1, s2: s2});
			this.instCount += 1;
		}
    }

	/**
	 * Run remaining instruction
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
	 runInst = () => {
        let que = this.state.instructions;
		let queLength = que.split(/\r\n|\r|\n/).length;
		
		if (this.checkStep(que, queLength)) {
			while (this.instCount < queLength) {
				this.stepInst();
			}
		}
	}

    resetInst = () => {
		this.instCount = 0;
		this.setState({consoleOutput: "", type : "", des: "", s1: "", s2: ""});
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
