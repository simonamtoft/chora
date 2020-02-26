import { compile_reg, compile_imm, compile_long } from "./compilers";

class ShiftAdd2 {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = isNaN(op2) == "string" ? "shadd2" : (Number(op2) > 0x0FFF ? "shadd2l" : "shadd2i");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "shadd2":
                this.binary = compile_reg(pred, rd, rs1, op2, 13);
                break;
            case "shadd2i":
                this.binary = compile_imm(pred, 13, rd, rs1, op2);
                break;
            case "shadd2l":
                this.binary = compile_long(pred, rd, rs1, 13, op2);
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = ((reg[this.rs1] << 2) + (this.type == "shadd2" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

export default ShiftAdd2;