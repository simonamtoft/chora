class AluCompare {
    constructor(instruction) {
        this.func = (instruction >>> 0) & 0x0F;
        this.rs1 = (instruction >>> 12) & 0x1F;
        this.op2 = (instruction >>> 7) & 0x1F;
        this.rd = (instruction >>> 17) & 0x1F;
        this.pred = (instruction >>> 27) & 0x0F;
        this.output = -1;
    }
}


class AluC extends AluCompare {
    constructor(instruction) {super(instruction)}
    
    execute() {
        switch(this.func) {
            
            // cmpeq
            case 0: 
                this.output = (this.rs1 == this.op2);
                console.log("Cmpeq executed on, ", this.func)
                break;

            // cmpneq
            case 1: 
                this.output = (this.rs1 != this.op2);
                console.log("Cmpneq executed on, ", this.func)
                break;
            
            // cmplt
            case 2: 
                this.output = (this.rs1 < this.op2);
                console.log("Cmplt executed on, ", this.func)
                break;

            // cmple
            case 3: 
                this.output = (this.rs1 <= this.op2);
                console.log("Cmplt executed on, ", this.func)
                break;

            // cmpult
            // missing convert to unsigned ! 
            case 4: 
                this.output = (this.rs1 < this.op2);
                console.log("Cmpult executed on, ", this.func)
                break;
            
            // cmpule
            // missing convert to unsigned ! 
            case 5: 
                this.output = (this.rs1 <= this.op2);
                console.log("Cmpule executed on, ", this.func)
                break;
            
            // btest
            case 6: 
                this.output = (this.rs1 & (1 << this.op2)) != 0;
                console.log("Btest executed on, ", this.func)
                break;
            
            default:
                console.log("Unused func in AluCompare: ", this.func); break;
        }
    }

}

// Not really sure what the difference is between AluC and AluCi.. 
class AluCi extends AluCompare { 
    constructor(instruction) {super(instruction)}

}

export default AluC;
