const compile_reg = (pred, rd, rs1, rs2, func) => {
    let binary = [0];
    pred = typeof pred == "number" ? pred : Number(pred);
    rd = typeof rd == "number" ? rd : Number(rd.match(/\d+/i)[0]);
    rs1 = typeof rs1 == "number" ? rs1 : Number(rs1.match(/\d+/i)[0]);
    rs2 = typeof rs2 == "number" ? rs2 : Number(rs2.match(/\d+/i)[0]);
    func = typeof func == "number" ? func : Number(func);

    binary[0] |= pred << 27;
    binary[0] |= 0b01000 << 22;
    binary[0] |= rd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= rs2 << 7;
    binary[0] |= func << 0;
    return binary;
};
const compile_imm = (pred, func, rd, rs1, imm) => {
    let binary = [0];
    pred = typeof pred == "number" ? pred : Number(pred);
    func = typeof func == "number" ? func : Number(func);
    rd = typeof rd == "number" ? rd : Number(rd.match(/\d+/i)[0]);
    rs1 = typeof rs1 == "number" ? rs1 : Number(rs1.match(/\d+/i)[0]);
    imm = typeof imm == "number" ? imm : Number(imm.match(/\d+/i)[0]);

    binary[0] |= pred << 27;
    binary[0] |= func << 22;
    binary[0] |= rd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= imm << 0;
    return binary;
};
const compile_long = (pred, rd, rs1, func, long) => {
    let binary = [0, 0];
    pred = typeof pred == "number" ? pred : Number(pred);
    func = typeof func == "number" ? func : Number(func);
    rd = typeof rd == "number" ? rd : Number(rd.match(/\d+/i)[0]);
    rs1 = typeof rs1 == "number" ? rs1 : Number(rs1.match(/\d+/i)[0]);
    long = typeof long == "number" ? long : Number(long.match(/\d+/i)[0]);

    binary[0] |= pred << 27;
    binary[0] |= 0b11111 << 22;
    binary[0] |= rd << 17;
    binary[0] |= rs1 << 12;
    binary[0] |= func;
    binary[1] = long & 0xFFFFFFFF;

    return binary;
};

class Add {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "add" : (Number(op2) > 0x0FFF ? "addl" : "addi");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "add":
                this.binary = compile_reg(pred, rd, rs1, op2, 0);
                break;
            case "addi":
                this.binary = compile_imm(pred, 0, rd, rs1, op2);
                break;
            case "addl":
                this.binary = compile_long(pred, rd, rs1, 0, op2);
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] + (this.type == "add" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

class Sub {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "sub" : (Number(op2) > 0x0FFF ? "subl" : "subi");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "sub":
                this.binary = compile_reg(pred, rd, rs1, op2, 1);
                break;
            case "subi":
                this.binary = compile_imm(pred, 1, rd, rs1, op2);
                break;
            case "subl":
                this.binary = compile_long(pred, rd, rs1, 1, op2);
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] - (this.type == "sub" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

class Xor {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "xor" : (Number(op2) > 0x0FFF ? "xorl" : "xori");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "xor":
                this.binary = compile_reg(pred, rd, rs1, op2, 2);
                break;
            case "xori":
                this.binary = compile_imm(pred, 2, rd, rs1, op2);
                break;
            case "xorl":
                this.binary = compile_long(pred, rd, rs1, 2, op2);
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] ^ (this.type == "xor" ? reg[this.op2] : Number(this.op2))) | 0;
    }
}

class ShiftLeft {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "sl" : (Number(op2) > 0x0FFF ? "sll" : "sli");
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

class ShiftRight {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "sr" : (Number(op2) > 0x0FFF ? "srl" : "sri");
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
        }
    }

    execute({ reg }) {
        reg[this.rd] = (reg[this.rs1] >>> (this.type == "sr" ? reg[this.op2] & 0x1F : Number(this.op2) & 0x1F)) | 0;
    }
}

class ShiftRightArithmetic {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "sra" : (Number(op2) > 0x0FFF ? "sral" : "srai");
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

class Nor {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "nor" : (Number(op2) > 0x0FFF ? "norl" : "nori");
        this.rd = rd;
        this.rs1 = rs1;
        this.op2 = op2;

        switch (this.type) {
            case "nor":
                this.binary = compile_reg(pred, rd, rs1, op2, 11);
                break;
            case "nori":
                this.binary = compile_imm(pred, 11, rd, rs1, op2);
                break;
            case "norl":
                this.binary = compile_long(pred, rd, rs1, 11, op2);
                break;
        }
    }

    execute({ reg }) {
        reg[this.rd] = ~((reg[this.rs1] | (this.type == "nor" ? reg[this.op2] : Number(this.op2))) | 0);
    }
}

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

class ShiftAdd2 {
    constructor({ pred, rd, rs1, op2 }) {
        this.type = typeof op2 == "string" ? "shadd2" : (Number(op2) > 0x0FFF ? "shadd2l" : "shadd2i");
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
export { Add, Sub, Xor, ShiftLeft, ShiftRight, ShiftRightArithmetic, Nor, ShiftAdd, ShiftAdd2 };