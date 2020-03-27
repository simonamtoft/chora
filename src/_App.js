import React, { Component } from "react";
import "./css/App.css";
import FrontEnd from "./front_end/_FrontEnd";
import CPU from "./work_logic/Processor/_CPU";
import Assembler from "./work_logic/Processor/_Assembler";

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
 * Handles code editor updates.
 * Resets CPU and runs assembler to generate instruction que and labels.
 * @param {string} 	editor 	- User input instructions
 */
editorUpdate = (editor) => {
	if(!this.assembler.run(editor))
		return;
	this.cpu.reset();
	this.cpu.populate(this.assembler.bundles);
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
	this.cpu.step();
	this.forceUpdate(); // To re-render

	console.log("Step button pressed");
}

/**
 * Run button pressed. Runs remaining instructions.
 */
runBtn = () => {
	this.cpu.run();
	this.forceUpdate(); // To re-render

	console.log("Run button pressed");
}

resetBtn = () => {
	this.cpu.reset();
	this.cpu.populate(this.assembler.bundles);
	this.forceUpdate(); // To re-render

	console.log("Reset button pressed");
}

prevBtn = () => {
	this.cpu.prev();
	this.forceUpdate(); // To re-render

	console.log("Prev button pressed");
}

render() {
	return (
		<div>
			<FrontEnd
				registers = {this.cpu.getReg()}
				memory = {this.cpu.getMem()}
				editorUpdate = {this.editorUpdate}
				stepClick = {this.stepBtn}
				runClick = {this.runBtn}
				prevClick = {this.prevBtn}
				resetClick = {this.resetBtn}
				consoleOutput = {this.state.consoleOutput}
				pc = {this.cpu.getPC()}
				bundles = {this.cpu.bundles}
			/>	
		</div>
	);
}
}

export default App;
