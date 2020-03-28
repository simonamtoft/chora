import ProcessorState from "./ProcessorState";
import { binTypes, controlFlowTypes } from "../../helpers/typeStrings";

class CPU {
	constructor() {
		this.state = new ProcessorState();
		this.history = [];
		this.bundles = {};
	}

	reset() {
		this.state.reset();
		this.history = [];
		this.bundles = {};
	}

	getPC() {
		return this.state.cpu["pc"];
	}

	step() {
		let bundle = this.bundles[this.state.cpu.pc];
		if(!bundle)
			return false;
		for(let i of bundle){
			this.execute(i.instruction);
		}
		return true;
	}

	// Step one instruction backwards in queue
	prev() {
		this.state.rewindOnce();
	}

	// Run all instructions.
	run() {
		while(this.bundles[this.state.cpu.pc]){
			this.step();
		}
	}

	/**
	 * Map bundle array to corresponding offsets
	 * @param {Object[]} bundles - An array of bundle objects.
	 */
	populate(bundles){
		for(let bundle of bundles){
			this.bundles[bundle.offset] = bundle.instructions;
		}
	}

	/**
 	* @param {Object} inst - Instruction object
	*/
	execute(inst) {
		this.state.updateHistory();
		
		if ( ((inst.pred & 0b1000)) ^ this.state.reg[`p${inst.pred & 0b0111}`] ) {
			inst.execute(this.state);
		}
		if(binTypes.includes(inst.name) && inst.type === "l"){
			this.state.cpu.pc += 8;
		} else if (!controlFlowTypes.includes(inst.name)){
			this.state.cpu.pc += 4;
		}


		// Set values of read-only registers
		this.state.reg.r0 = 0;
		this.state.reg.p0 = 1;

		// Set value of s0
		this.state.reg.s0 = 0;
		for (let i = 0; i < 8; i++) {
			this.state.reg.s0 |= this.state.reg[`p${i}`] << i;
		}
		//console.log(this.state.reg.s0);
	}

	getReg() {
		return this.state.getReg();
	}

	getMem() {
		return this.state.getMemory();
	}
}

export default CPU;
