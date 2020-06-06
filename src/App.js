import React, { Component } from "react";
import FrontEnd from "./Front End/FrontEnd";
import CPU from "./Work Logic/Processor/CPU";
import Assembler from "./Work Logic/Processor/Assembler";
import "./CSS/App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.cpu = new CPU();
		this.a = new Assembler();
	}

	editorUpdate = (editor) => {
		console.clear();
		console.log("Run Assembler");
		if (this.a.run(editor)) {
			console.log("Assembler ran successfully");
			this.cpu.populate(this.a.bundles);
		}
		this.forceUpdate();
	}

	stepBtn = () => {
		this.cpu.step();
		this.forceUpdate(); // To re-render
	}

	runBtn = () => {
		this.cpu.run();
		this.forceUpdate(); // To re-render
	}

	resetBtn = () => {
		this.cpu.populate(this.a.bundles);
		this.forceUpdate(); // To re-render
	}

	prevBtn = () => {
		this.cpu.prev();
		this.forceUpdate(); // To re-render
	}

	/**
	 * Dump button pressed. Saves the binary stream to a file.
	 */
	dumpBtn = () => {
		let mem = this.cpu.getMem();
		let dump = new Uint8Array(mem["TEXT_END"]);
		
		for (let i = 0; i < mem["TEXT_END"]; i += 4) {
			dump[i] = mem[i];
			dump[i+1] = mem[i+1];
			dump[i+2] = mem[i+2];
			dump[i+3] = mem[i+3];	
		}

		let file = new Blob([dump], {type: "application/octet-stream"});
		let a = document.createElement("a"), url = URL.createObjectURL(file);
		a.href = url;
		a.download = "chora.o";
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
					pc={this.cpu.getPC()}
					bundles={this.cpu.bundles}
					error={this.a.error}
					numMap={this.a.numMap}
				/>
			</div>
		);
	}
}

export default App;
