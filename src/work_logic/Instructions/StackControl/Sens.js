import StackControl from "./StackControl";

/** 
 * Sres instruction class. 
 * @extends StackControl
 * @category StackControl
 */
class Sens extends StackControl {
    /**
     * Create Sens instruction.
     * @param {Object}          fields      - Fields to set 
     * @param {string|number}   fields.pred - Instruction predicate
	 * @param {number}			fields.s1	- Immediate value 
     */
    constructor({ pred, s1 }) {
        super({name: "sens", pred, op: 0b01, s1});
    }

    /**
     * Executes the instruction
     * @param {Object}                  state        - Processor state
     * @param {Object.<string, number>} state.reg    - Registers
     */
    execute({ reg }) {
        let n = Number(this.type == "r" ? reg[this.s1] : this.s1) << 2; // Word size to byte size
        reg["s5"] = Math.max(reg["s5"], reg["s6"] + n);
        
        /*
        let nfill;
        nfill = n - (reg["s5"] - reg["s6"]); // n - (m_top - sc_top)
        for (let i = 0; i < nfill; ++i){
            // We aren't actually implementing a stack cache and thus no copying is needed.
            //sc[reg["s5"]] = gm[reg["s5"]];
            reg["s5"] += 1;
        }
        */
    }
}

export default Sens;
