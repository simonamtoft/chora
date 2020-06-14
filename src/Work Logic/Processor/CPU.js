import ProcessorState from "./ProcessorState";
import { binTypes, cfTypes } from "../../Helpers/typeStrings";
import { allRegStr } from "../../Helpers/regStrings";

class CPU {
	constructor() {
		this.state = new ProcessorState();
		this.bundles = {};
		this.pending_branch = null;
		window.state = this.state;
	}

	reset() {
		this.state.reset();
		this.bundles = {};
		this.pending_branch = null;
	}

	getPC() {
		return this.state.cpu["pc"];
	}

	step() {
		let bundle = this.bundles[this.state.cpu.pc];
		if(!bundle) return false;
		this.state.updateHistory();
		bundle.length === 2 ? this.dualIssue(bundle) : this.execute(bundle[0].instruction);
		if (this.pending_branch) this.handlePendingBranch();
		return true;
	}

	dualIssue(bundle) {
		// slight spaghetti to ensure that bundles like (p0) addi r1 = r0, 5 || (p0) addi r2 = r1, 5; work
		let pc = this.state.cpu.pc;
		let conflicts = {};
		for(let op of bundle[0].ops){
			if(allRegStr.includes(op) && bundle[1].ops.includes(op)){
				conflicts[op] = {};
			}
		}
		// store original values
		for(let conflict in conflicts){
			conflicts[conflict].prev = this.state.reg[conflict];
		}
		// execute
		this.execute(bundle[0].instruction);
		// store and reset
		for(let conflict in conflicts){
			if(conflicts[conflict].prev !== this.state.reg[conflict]){
				conflicts[conflict].next = this.state.reg[conflict];
				this.state.reg[conflict] = conflicts[conflict].prev;
			}
		}
		// execute
		this.execute(bundle[1].instruction);
		// recover
		for(let conflict in conflicts){
			if(conflicts[conflict].next) 
				this.state.reg[conflict] = conflicts[conflict].next;
		}

		this.state.cpu.pc = pc + 8;
	}

	handlePendingBranch() {
		if(this.pending_branch.delay !== 0){
			this.pending_branch.delay--;
		} else {
			if(this.pending_branch.inst.name === "br"){
				this.state.cpu.pc = this.pending_branch.pc;
			} else {
				this.state.cpu.pc -= 4;
			}
			this.pending_branch.inst.execute(this.state);
			this.pending_branch = null;
		}
	}

	// Step one instruction backwards in queue
	prev() {
		this.state.rewindOnce();
	}

	// Run all instructions.
	run() {
		let n = 0;
		let start, end;
		start = performance.now();
		while(this.bundles[this.state.cpu.pc]){
			this.step();
			n++;
		}
		end = performance.now();
		console.log(n, "bundles executed in", end-start, "ms.");
		console.log(n/((end-start)/1000), "bundles pr. second.");

	}

	/**
	 * Map bundle array to corresponding offsets
	 * @param {Object[]} bundles - An array of bundle objects.
	 */
	populate(bundles){
		this.reset();
		let bundle, addr, base_set = false;

		for(bundle of bundles){
			addr = bundle.offset;
			if(bundle.is_data){
				switch(bundle.data.type){
					case "word":
						this.state.mem[addr + 3] = bundle.data.value & 0xFF;
						this.state.mem[addr + 2] = (bundle.data.value >> 8) & 0xFF;
						this.state.mem[addr + 1] = (bundle.data.value >> 16) & 0xFF;
						this.state.mem[addr + 0] = (bundle.data.value >> 24) & 0xFF;
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
				this.bundles[addr] = bundle.instructions;
				this.setMem(addr, bundle);
			}
		}

		if (bundle === undefined)
			return false;

		this.state.mem["TEXT_END"] = Number(addr) + bundle.size;
		return true;
	}

	setMem(addr, bundle){
		let o = 0;
		for(let inst of bundle.instructions){
			for(let int of inst.instruction.binary){
				this.state.mem[addr + o + 3] = int & 0xFF;
				this.state.mem[addr + o + 2] = (int >> 8) & 0xFF;
				this.state.mem[addr + o + 1] = (int >> 16) & 0xFF;
				this.state.mem[addr + o + 0] = (int >> 24) & 0xFF;
				o += 4;
			}
		}
	}

	/**
 	* @param {Object} inst - Instruction object
	*/
	execute(inst) {
		if ( ((inst.pred & 0b1000) >>> 3) !== this.state.reg[`p${inst.pred & 0b0111}`] ) {
			if(!cfTypes.includes(inst.name) || inst.name.includes("nd")){
				inst.execute(this.state);
			} else {
				let delay = 0;
				switch(inst.name){
					case "br":
						delay = 2;
						break;
					default:
						delay = 3;
						break;
				}
				this.pending_branch = { delay, inst, pc: this.state.cpu.pc };
				this.state.cpu.pc += 4;
			}
		} else if (cfTypes.includes(inst.name)){
			this.state.cpu.pc += 4;
		}

		if(binTypes.includes(inst.name) && inst.type === "l") {
			this.state.cpu.pc += 8;
		} else if(!cfTypes.includes(inst.name)){
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
