import { compile_reg, compile_imm, compile_long } from "./compilers";

class ShiftRightArithmetic {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "sra" : (Number(op2) > 0x0FFF ? "sral" : "srai");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "sra":
                this.binary = compile_reg(pred, rd, rs1, op2, 5);
                break;
            case "srai":
                this.binary = compile_imm(pred, 5, rd, rs1, op2);
                break;
            case "sral":
                this.binary = compile_long(pred, rd, rs1, 5, op2);
                break;
        }
    }
    
    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] >> (this.type == "sra" ? reg[this.op2] & 0x1F : Number(this.op2) & 0x1F)) | 0;
    }
}

export default ShiftRightArithmetic;