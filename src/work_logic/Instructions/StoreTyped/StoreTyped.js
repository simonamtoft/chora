import {compile_reg} from "./compilers";
import { toUint32 } from "../../../helpers/misc";

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
		console.error("Missing execute handler for", this);
	}
}

export default StoreTyped;
