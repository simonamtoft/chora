import ProcessorState from "./ProcessorState";
import { binTypes, cfTypes } from "../../Helpers/typeStrings";

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
		this.state.updateHistory();
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
		let base_set = false;
		for(let bundle of bundles){
			let addr = bundle.offset;
			if(bundle.is_data){
				switch(bundle.data.type){
					case "word":
						this.state.mem[addr + 0] = bundle.data.value & 0xFF;
						this.state.mem[addr + 1] = (bundle.data.value >> 8) & 0xFF;
						this.state.mem[addr + 2] = (bundle.data.value >> 16) & 0xFF;
						this.state.mem[addr + 3] = (bundle.data.value >> 24) & 0xFF;
						break;
					default:
						return false;
				}
			} else {
				if(!base_set){
					this.state.cpu.base = addr;
					this.state.cpu.pc = addr;
					base_set = true;
				}
				let o = 0;
				this.bundles[addr] = bundle.instructions;
				for(let inst of bundle.instructions){
					for(let int of inst.instruction.binary){
						this.state.mem[addr + o + 0] = int & 0xFF;
						this.state.mem[addr + o + 1] = (int >> 8) & 0xFF;
						this.state.mem[addr + o + 2] = (int >> 16) & 0xFF;
						this.state.mem[addr + o + 3] = (int >> 24) & 0xFF;
						o += 4;
					}
				}
			}
		}
		return true;
	}

	/**
 	* @param {Object} inst - Instruction object
	*/
	execute(inst) {
		if ( ((inst.pred & 0b1000) >>> 3) !== this.state.reg[`p${inst.pred & 0b0111}`] ) {
			inst.execute(this.state);
		} else if (cfTypes.includes(inst.name)) {
			this.state.cpu.pc += 4;
		}

		if(binTypes.includes(inst.name) && inst.type === "l") {
			this.state.cpu.pc += 8;
		} else if (!cfTypes.includes(inst.name)) {
			this.state.cpu.pc += 4;
		}
		this.setReadReg();
	}

	getReg() {
		return this.state.getReg();
	}

	getMem() {
		return this.state.getMemory();
	}

	setReadReg() {
		this.state.reg.r0 = 0;
		this.state.reg.p0 = 1;
		this.state.reg.s0 = 0;
		for (let i = 0; i < 8; i++) {
			this.state.reg.s0 |= this.state.reg[`p${i}`] << i;
		}
	}
}

export default CPU;
