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
		this.assembler.reset();
		this.assembler.run(editor);
    }

	/**
	 * Adds input to consoleOutput and goes to new line
	 * @param {string | number} 	line 	- Line to be added to consoleOutput
	 */
	addConsoleOutput = (line) => {
		if (line==="") {
			this.setState((prevState) => ({
				consoleOutput: prevState.consoleOutput
			}));
		} else {
			this.setState((prevState) => ({
				consoleOutput: prevState.consoleOutput + line + '\n'
			}));
		}
	}

	/**
	 * Step one instruction, if any left to execute
	 * @field que : All instructions
	 * @field queLength: Amount of instructions
	 */
    stepInst = () => {
		if (this.assembler.checkQue(this.instCount)) {
			let inst = this.assembler.instQue[this.instCount];
			this.cpu.execute(inst);
			this.instCount += 1;
			this.forceUpdate(); // To re-render
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
		this.setState({consoleOutput: ""}); // Also re-renders
	}

	prevInst = () => {
		this.instCount -= 1;
		console.log("Prev");
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
					prevClick = {this.prevInst}
					resetClick = {this.resetInst}
					consoleOutput = {this.state.consoleOutput}
					queLength = {this.assembler.queLength}
					instQue = {this.assembler.instQue}
					instCount = {this.instCount}
					binary = {this.assembler.binary}
				/>	
            </div>
        );
    }
}

export default App;
