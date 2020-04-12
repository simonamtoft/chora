import React, { Component } from "react";
import FrontEnd from "./Front End/FrontEnd";
import CPU from "./Work Logic/Processor/CPU";
import Assembler from "./Work Logic/Processor/Assembler";
import "./CSS/App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.cpu = new CPU();
		this.assembler = new Assembler();
		this.state = {
			consoleOutput: "",
		};
	}

	/**
	 * Handles code editor updates.
	 * Resets CPU and runs assembler to generate instruction que and labels.
	 * @param {string} 	editor 	- User input instructions
	 */
	editorUpdate = (editor) => {
		console.clear();
		console.log("Run Assembler");
		if (this.assembler.run(editor)) {
			console.log("Assembler ran successfully");
			this.cpu.populate(this.assembler.bundles);
		}
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
	}

	/**
	 * Run button pressed. Runs remaining instructions.
	 */
	runBtn = () => {
		this.cpu.run();
		this.forceUpdate(); // To re-render
	}

	resetBtn = () => {
		this.cpu.populate(this.assembler.bundles);
		this.forceUpdate(); // To re-render
	}

	prevBtn = () => {
		this.cpu.prev();
		this.forceUpdate(); // To re-render
	}

	dumpBtn = () => {
		let mem = this.cpu.getMem();
		let dump = new Uint8Array(mem["TEXT_END"]);
		
		for (let i = 0; i < mem["TEXT_END"]; i += 4) {
			dump[i] = mem[i+3];
			dump[i+1] = mem[i+2];
			dump[i+2] = mem[i+1];
			dump[i+3] = mem[i];	
		}

		let file = new Blob([dump], {type: "text/plain"});
		let a = document.createElement("a"), url = URL.createObjectURL(file);
		a.href = url;
		a.download = "dump.o";
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
		
	}


	render() {
		document.body.style.overflowY = "hidden";
		return (
			<div className="no-scroll">
				<FrontEnd
					registers={this.cpu.getReg()}
					memory={this.cpu.getMem()}
					history={this.cpu.state.history}
					editorUpdate={this.editorUpdate}
					stepClick={this.stepBtn}
					runClick={this.runBtn}
					prevClick={this.prevBtn}
					resetClick={this.resetBtn}
					dumpClick = {this.dumpBtn}
					consoleOutput={this.state.consoleOutput}
					pc={this.cpu.getPC()}
					bundles={this.cpu.bundles}
					error={this.assembler.error}
				/>
			</div>
		);
	}
}

export default App;
