import { compile_reg, compile_reg2, compile_ireg, compile_imm } from "./compilers";

/** 
 * Represents a ControlFlow instruction. Sets common fields. 
 */
class ControlFLow {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.op   - Type of control
	 * @param {string}          fields.s1   - Either source register or immediate value
	 * @param {string}          fields.s2   - Source register 2.
     */
	constructor({ name, pred, d, op, s1, s2 }) {
		this.type = (s1 === undefined && s2 === undefined) ? "implicit" : isNaN(s1) ? (s2 ? "single_reg" : "two_reg") : "immediate";
		this.name = name;
		this.pred = pred;
		this.d = d;
		this.op = op;
		this.s1 = s1;
		this.s2 = s2;

		switch(this.type){
			case "implicit":
				this.binary = compile_ireg(this.pred, this.d, this.op);
				break;
			case "single_reg":
				this.binary = compile_reg(this.pred, this.d, this.op, this.s1);
				break;
			case "two_reg":
				this.binary = compile_reg2(this.pred, this.d, this.op, this.s1, this.s2);
				break;
			case "immediate":
				this.binary = compile_imm(this.pred, this.op, this.d, this.s1);
				break;
			default:
				console.log(`Something done goofed in Control Flow for ${this.name}`);
		}
	}
	execute(){
		console.error("Missing execute handler for", this);
	}
}

export default ControlFLow;
