import { compile_reg, compile_imm, compile_long } from "./compilers";

class ShiftRight {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "sr" : (Number(op2) > 0x0FFF ? "srl" : "sri");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;
        
        switch (this.type) {
            case "sr":
                this.binary = compile_reg(pred, rd, rs1, op2, 4);
                break;
            case "sri":
                this.binary = compile_imm(pred, 4, rd, rs1, op2);
                break;
            case "srl":
                this.binary = compile_long(pred, rd, rs1, 4, op2);
                break;
            default: 
                console.log("not implemented");
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] >>> (this.type == "sr" ? reg[this.op2] & 0x1F : Number(this.op2) & 0x1F)) | 0;
    }
}

export default ShiftRight;