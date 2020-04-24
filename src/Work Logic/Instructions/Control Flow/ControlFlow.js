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
		this.type = (!s1 && !s2) ? "implicit" : (isNaN(s1) ? (!s2 ? "single_reg" : "two_reg") : "immediate");
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
				this.s1 &= 0x3FFFFF;
				this.binary = compile_imm(this.pred, this.op, this.d, this.s1);
				this.s1 = (Number(this.s1) << 10) >> 8;
				break;
			default:
				throw new Error(`Unexpected type in ${this.name}`);
		}
	}
	execute(){
		throw new Error("Missing execute handler for", this);
	}
	toString(){
		let s1 = this.s1 ? isNaN(this.s1) ? this.s1 : this.s1 >> 2 : "";
		return `${this.pred ? `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ` : ""}${this.name} ${s1} ${this.s2 ? ", "+this.s2 : ""}`;
	}
}

export default ControlFLow;
