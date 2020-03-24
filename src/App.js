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
	this.reset();
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
	let inst = this.assembler.instQue[this.cpu.pc];
	this.cpu.execute(inst);
	
	this.forceUpdate(); // To re-render
}

/**
 * Run remaining instruction
 * @field que : All instructions
 * @field queLength: Amount of instructions
 */
runInst = () => {
	while (this.cpu.pc < this.assembler.queLength) {
		this.stepInst();
	}
}

reset = () => {
	this.cpu.reset();
	console.log("Reset");
	this.forceUpdate(); // To re-render
}

prevInst = () => {
	this.cpu.pc -= 1;
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
				resetClick = {this.reset}
				consoleOutput = {this.state.consoleOutput}
				queLength = {this.assembler.queLength}
				instQue = {this.assembler.instQue}
				instCount = {this.cpu.pc}
				binary = {this.assembler.binary}
				canRun = {this.canRun}
				pseudo = {this.assembler.originalCode}
			/>	
		</div>
	);
}
}

export default App;
