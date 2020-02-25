
class AluM {
    constructor(instruction) {
        this.func = (instruction >>> 0) & 0x0F;
        this.rs2 =  (instruction >>> 7) & 0x1F;
        this.rs1 =  (instruction >>> 12) & 0x1F;
        this.pred = (instruction >>> 27) & 0x0F;
        this.output = -1;
    }
}


class DecodeM extends AluM {
    constructor(instruction) {super(instruction)}

    execute() {
        switch(this.func) {
            
            // mul
            case 0:
                sl = this.rs1 * this.rs2;
                sh = sl >>> 32;

            // mulu
            // missing conversion to unsigned int 32
            case 1:
                sl = this.rs1 * this.rs2; 
                sh = sl >>> 32;

            default: 
                console.log("Unused func in AluM: ", this.func); 
                break;
        }
    }
}

// sl and sh needs to be send to register

export default DecodeM;
