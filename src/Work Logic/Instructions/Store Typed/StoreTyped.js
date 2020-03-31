import {compile_reg} from "./compilers";
import { toUint32 } from "../../../Helpers/misc";

/** 
 * Represents a StoreTyped instruction. Sets common fields. 
 */
class StoreTyped {
	/**
     * Create base instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string}          fields.name - Name of instruction
     * @param {string|number}   fields.pred - Instruction predicate
     * @param {string}          fields.ra   - Destination
     * @param {string}          fields.rs  	- Source register
     * @param {number}   		fields.imm  - Immediate offset value
     */
	constructor({ name, pred, type, ra, rs, imm }) {
		this.name = name;
		this.pred = pred;
		this.type = type;
		this.ra = ra;
		this.rs = rs;
		this.imm = toUint32(imm) & 0x7F;
		this.binary = compile_reg(pred, type, ra, rs, imm);
	}

	execute() {
		throw new Error("Missing execute handler for", this);
	}

	toString(){
		return `(${this.pred&0b1000 ? "!" : ""}p${this.pred&0b0111}) ${this.name} [${this.ra} + ${this.imm}] = ${this.rs}`;
	}
}

export default StoreTyped;
