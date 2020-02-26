import { compile_reg, compile_imm, compile_long } from "./compilers";
class ShiftAdd {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "shadd" : (Number(op2) > 0x0FFF ? "shaddl" : "shaddi");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;
        switch (this.type) {
            case "shadd":
                this.binary = compile_reg(pred, rd, rs1, op2, 12);
                break;
            case "shaddi":
                this.binary = compile_imm(pred, 12, rd, rs1, op2);
                break;
            case "shaddl":
                this.binary = compile_long(pred, rd, rs1, 12, op2);
                break;
        }
    }
    execute({ reg }) {
        reg[this.rd] = ((reg[this.rs1] << 1) + (this.type == "shadd" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

export default ShiftAdd;