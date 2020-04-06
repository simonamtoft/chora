class ProcessorState {
	constructor() {
		this.history = [];
		this.reg = {
			// General-purpose registers
			"r0" : 0,
			"r1" : 0, "r2" : 0, "r3" : 0, "r4" : 0, "r5" : 0,
			"r6" : 0, "r7" : 0, "r8" : 0, "r9" : 0, "r10" : 0, 
			"r11" : 0, "r12" : 0, "r13" : 0, "r14" : 0, "r15" : 0,
			"r16" : 0, "r17" : 0, "r18" : 0, "r19" : 0, "r20" : 0, 
			"r21" : 0, "r22" : 0, "r23" : 0, "r24" : 0, "r25" : 0,
			"r26" : 0, "r27" : 0, "r28" : 0, "r29" : 0, "r30" : 0, 
			"r31" : 0,
			// Special-purpose registers
			"s0" : 1, "s1" : 0, "s2" : 0, "s3" : 0, "s4" : 0, "s5" : 0,
			"s6" : 0, "s7" : 0, "s8" : 0, "s9" : 0, "s10" : 0,
			"s11" : 0, "s12" : 0, "s13" : 0, "s14" : 0, "s15" : 0,
			// Predicate registers
			"p0": 1, "p1": 0, "p2" : 0, "p3" : 0, "p4" : 0, "p5" : 0,
			"p6" : 0, "p7" : 0
		};
		this.mem = {
			"BASE_ADDR": 0x0,
			"MAX_SIZE": 0x00200000 // 2MiB
		};
		this.cpu = {
			"base": 0,
			"pc": 0
		};
	}
	
	reset() {
		this.history = [];
		this.mem = {
			"BASE_ADDR": 0x0,
			"MAX_SIZE": 0x00200000 // 2MiB
		};
		this.reg = {
			// General-purpose registers
			"r0" : 0,
			"r1" : 0, "r2" : 0, "r3" : 0, "r4" : 0, "r5" : 0,
			"r6" : 0, "r7" : 0, "r8" : 0, "r9" : 0, "r10" : 0, 
			"r11" : 0, "r12" : 0, "r13" : 0, "r14" : 0, "r15" : 0,
			"r16" : 0, "r17" : 0, "r18" : 0, "r19" : 0, "r20" : 0, 
			"r21" : 0, "r22" : 0, "r23" : 0, "r24" : 0, "r25" : 0,
			"r26" : 0, "r27" : 0, "r28" : 0, "r29" : 0, "r30" : 0, 
			"r31" : 0,
			// Special-purpose registers
			"s0" : 1, "s1" : 0, "s2" : 0, "s3" : 0, "s4" : 0, "s5" : 0,
			"s6" : 0, "s7" : 0, "s8" : 0, "s9" : 0, "s10" : 0,
			"s11" : 0, "s12" : 0, "s13" : 0, "s14" : 0, "s15" : 0,
			// Predicate registers
			"p0": 1, "p1": 0, "p2" : 0, "p3" : 0, "p4" : 0, "p5" : 0,
			"p6" : 0, "p7" : 0
		};
		this.cpu = {
			"base": 0,
			"pc": 0
		};
	}
	
	getMemory() {
		return this.mem;
	}

	getReg() {
		return this.reg; 
	}

	updateHistory(){
		let r, m, c;
		r = Object.assign({}, this.reg);
		m = Object.assign({}, this.mem);
		c = Object.assign({}, this.cpu);
		this.history.push({reg: r, mem: m, cpu: c});
	}
	
	rewindOnce(){
		let prev = this.history.pop();
		if(!prev)
			return false;
		this.reg = prev.reg;
		this.mem = prev.mem;
		this.cpu = prev.cpu;
		return true;
	}
}

export default ProcessorState;
