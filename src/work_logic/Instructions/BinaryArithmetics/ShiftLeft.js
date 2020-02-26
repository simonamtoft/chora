import { compile_reg, compile_imm, compile_long } from "./ALU";
class ShiftLeft {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "sl" : (Number(op2) > 0x0FFF ? "sll" : "sli");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;
        switch (this.type) {
            case "sl":
                this.binary = compile_reg(pred, rd, rs1, op2, 3);
                break;
            case "sli":
                this.binary = compile_imm(pred, 3, rd, rs1, op2);
                break;
            case "sll":
                this.binary = compile_long(pred, rd, rs1, 3, op2);
                break;
        }
    }
    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] << (this.type == "sl" ? reg[this.op2] & 0x1F : Number(this.op2) & 0x1F)) | 0;
    }
}

export default ShiftLeft;