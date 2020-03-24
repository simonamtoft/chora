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
		this.state = {
			consoleOutput: "",
		};
	}

/***
 * Generate instruction que from editor
 * @param {string} 	editor 	- User input instructions
 */
getUserInput = (editor) => {
	this.cpu.reset();
	this.assembler.run(editor);
	this.forceUpdate();
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
stepBtn = () => {
	this.cpu.step(this.assembler.instQue);
	this.forceUpdate(); // To re-render

	console.log("Step button pressed");
}

/**
 * Run button pressed. Runs remaining instructions.
 */
runBtn = () => {
	this.cpu.run(this.assembler.queLength, this.assembler.instQue);
	this.forceUpdate(); // To re-render
	
	console.log("Run button pressed");
}

resetBtn = () => {
	this.cpu.reset();
	this.forceUpdate(); // To re-render

	console.log("Reset button pressed");
}

prevBtn = () => {
	this.cpu.pc -= 1;
	this.forceUpdate(); // To re-render

	console.log("Prev button pressed");
}

render() {
	return (
		<div>
			<FrontEnd
				registers = {this.cpu.getReg()}
				cache = {this.cpu.getCache()}
				parentCallback = {this.getUserInput}
				stepClick = {this.stepBtn}
				runClick = {this.runBtn}
				prevClick = {this.prevBtn}
				resetClick = {this.resetBtn}
				consoleOutput = {this.state.consoleOutput}
				queLength = {this.assembler.queLength}
				instQue = {this.assembler.instQue}
				pc = {this.cpu.pc}
				binary = {this.assembler.binary}
				pseudo = {this.assembler.originalCode}
			/>	
		</div>
	);
}
}

export default App;
