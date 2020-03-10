import React, { Component } from "react";
import "./css/App.css";
import FrontEnd from "./front_end/FrontEnd"
import CPU from "./work_logic/Processor/CPU"
import Assembler from "./work_logic/Processor/Assembler";
//import { generateInstQue } from "./work_logic/Processor/Assembler";

class App extends Component {
    constructor(props) {
        super(props);
		this.cpu = new CPU();
		this.assembler = new Assembler();
		this.instCount = 0;
        this.state = {
			consoleOutput: "",
		};
	}

	/***
	 * Generate instruction que from editor
	 * @param {string} 	editor 	- User input instructions
	 */
    getUserInput = (editor) => {
		this.resetInst();
		this.assembler.generateInstQue(editor);
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
	 * Step one instruction, if any left to execute
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
    stepInst = () => {
		if (this.assembler.checkQue(this.instCount)) {
			let [type, des, s1, s2] = this.assembler.instQue[this.instCount];
			this.cpu.execute({pred: 0, type: type, des: des, s1: s1, s2: s2});
			this.instCount += 1;

			// Important that state is updated somewhere to re-render children etc.
			// This should instead be output to "Original code" field of "DisplayMachine.js"
			// Could be another state
			if (s2 === undefined) {
				this.addConsoleOutput(`${type}, ${des}, ${s1}`)
			} else {
				this.addConsoleOutput(`${type}, ${des}, ${s1}, ${s2}`)
			}
		}
    }

	/**
	 * Run remaining instruction
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
	runInst = () => {
		if (this.assembler.checkQue(this.instCount)) {
			while (this.instCount < this.assembler.queLength) {
				this.stepInst();
			}
		}
	}

    resetInst = () => {
		this.instCount = 0;
		this.cpu.reset();
		this.setState({consoleOutput: ""});
        console.log("Reset");
	}

    render() {
        return (
			<div>
				<FrontEnd
					registers = {this.cpu.storage.getReg()}
					cache = {this.cpu.storage.getCache()}
					parentCallback = {this.getUserInput}
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
