import React, { Component } from "react";
import "./css/App.css";
import FrontEnd from "./front_end/FrontEnd";
import CPU from "./work_logic/Processor/CPU";
import Assembler from "./work_logic/Processor/Assembler";

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
	this.setState((prevState) => ({
		consoleOutput: prevState.consoleOutput + line + "\n"
	}));
}

/**
 * Step one instruction, if any left to execute
 * @field que : All instructions
 * @field queLength: Amount of instructions
 */
stepInst = () => {
	if (this.instCount < this.assembler.queLength) {
		let inst = this.assembler.instQue[this.instCount];
		this.cpu.execute(inst);
		this.instCount += 1;
		this.forceUpdate(); // To re-render
	} else {
		console.log("No more to step.");
	}
	
}

/**
 * Run remaining instruction
 * @field que : All instructions
 * @field queLength: Amount of instructions
 */
runInst = () => {
	while (this.instCount < this.assembler.queLength) {
		this.stepInst();
	}
}

resetInst = () => {
	this.instCount = 0;
	this.cpu.reset();
	this.forceUpdate(); // To re-render
}

prevInst = () => {
	this.instCount -= 1;
	console.log("Prev");
	this.forceUpdate(); // To re-render
}

render() {
	return (
		<div>
			<FrontEnd
				registers = {this.cpu.getReg()}
				cache = {this.cpu.getCache()}
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
				error = {this.assembler.error}
			/>	
		</div>
	);
}
}

export default App;
