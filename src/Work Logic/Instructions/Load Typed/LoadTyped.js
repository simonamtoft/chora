import { compile_reg } from "./compilers";
import { toUint32 } from "../../../Helpers/misc";

/** 
 * Represents a LoadTyped instruction. Sets common fields. 
 */
class LoadTyped {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.rd   - Destination register
     * @param {string}          fields.ra  	- First source register
     * @param {string}   		fields.type - Instruction type
	 * @param {number}			fields.imm	- Immediate value 
     */
	constructor({ name, pred, rd, ra, type, imm }) {
		this.name = name;
		this.pred = pred;
		this.rd = rd;
		this.ra = ra;
		this.type = type;
		this.imm = toUint32(imm) & 0x7F;	// Imm is interpreted unsigned
		this.binary = compile_reg(pred, rd, ra, type, imm);
	}

	execute() {
		throw new Error("Missing execute handler for", this);
	}
	toString(){
		return `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ${this.name} ${this.rd} = [${this.ra} + ${this.imm}]`;
	}
}
export default LoadTyped;
