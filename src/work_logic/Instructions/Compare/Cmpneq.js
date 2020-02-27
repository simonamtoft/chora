import { compile_reg, compile_imm } from "./compilers";

class Cmpneq {
    constructor({ pred, pd, rs1, op2 }) {
        this.type = isNaN(op2) ? "cmpneq" : "cmpneqi";
        this.pd = pd;
        this.rs1 = rs1;
        this.op2 = op2;
        this.func = 0b0001;
    
        if (this.type == "cmpneq") {
            this.binary = compile_reg(pred, pd, rs1, op2, this.func);
        } else {
            this.binary = compile_imm(pred, pd, rs1, op2, this.func);
        }
    }

    execute( { reg } ) {
        reg[this.pd] = reg[this.rs1] != (this.type == "cmpneq" ? 
            reg[this.op2] : Number(this.op2));
    }
}

export default Cmpneq;
