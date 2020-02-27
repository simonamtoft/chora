//import { compile_reg } from "./compilers";

class Mulu {
    constructor({ pred, rs1, rs2, sl, sh }) {
        this.sl = sl;
        this.sh = sh;
        this.pred = pred;
        this.rs1 = rs1;
        this.rs2 = rs2;
        this.func = 0b0000;
        //this.binary = compile_reg(pred, pd, rs1, rs2, this.func);
    }

    execute( { reg } ) {
        reg[this.sl] = (reg[this.rs1] >>> 0) * (reg[this.rs2] >>> 0);
        reg[this.sh] = ((reg[this.rs1] >>> 0) * (reg[this.rs2] >>> 0)) >>> 32;
    }
}

export default Mulu;
