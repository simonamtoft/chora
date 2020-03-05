import React, { Component } from "react";
import { Add, Sub, Xor, Nor, ShiftLeft, ShiftRight, 
	ShiftRightArithmetic, ShiftAdd, ShiftAdd2 } from "../Instructions/BinaryArithmetics/index"
import { Btest, Cmpeq, Cmple, Cmplt, Cmpneq, Cmpule, Cmpult } from "../Instructions/Compare/index";
import { Lws, Lwl, Lwc, Lwm, Lhs, Lhl, Lhc, Lhm, Lbs, Lbl, Lbc, 
	Lbm, Lhus, Lhul, Lhuc, Lhum, Lbus, Lbul, Lbuc, Lbum} from "../Instructions/LoadTyped/index";
import { Mul, Mulu } from "../Instructions/Multiply/index";
import { Pand, Pxor, Por } from "../Instructions/Predicate/index";
//import {} from "../Instructions/StackControl/index";
import { Sbc, Sbl, Sbm, Sbs, Shc, Shl, Shm, Shs, Swc, Swl, Swm, Sws} from "../Instructions/StoreTyped/index";
import Bcopy from "../Instructions/Bcopy";
import Mfs from "../Instructions/Mfs";
import Mts from "../Instructions/Mts";

class CPU extends Component {
    constructor() {
		super();

        this.reg = {
			"r0" : 0,
            "r1" : 0, "r2" : 0, "r3" : 0, "r4" : 0, "r5" : 0,
            "r6" : 0, "r7" : 0, "r8" : 0, "r9" : 0, "r10" : 0, 
            "r11" : 0, "r12" : 0, "r13" : 0, "r14" : 0, "r15" : 0,
            "r16" : 0, "r17" : 0, "r18" : 0, "r19" : 0, "r20" : 0, 
            "r21" : 0, "r22" : 0, "r23" : 0, "r24" : 0, "r25" : 0,
            "r26" : 0, "r27" : 0, "r28" : 0, "r29" : 0, "r30" : 0, 
            "r31" : 0,
            "s1" : 0, "s2" : 0, "s3" : 0, "s4" : 0, "s5" : 0,
            "s6" : 0, "s7" : 0, "s8" : 0, "s9" : 0, "s10" : 0,
            "s11" : 0, "s12" : 0, "s13" : 0, "s14" : 0, "s15" : 0,
            "p0": 1, "p1": 0, "p2" : 0, "p3" : 0, "p4" : 0, "p5" : 0,
            "p6" : 0, "p7" : 0
        };
	}
	
	getReg = () => {
		return this.reg; 
	}

	executeInstruction(instruction) {
		this.pickInst(this, instruction);
	}

	pickInst = (state, inst) => {
		let cInst; // Placeholder to execute inst
	
		// Convert inst into the needed types of instructions
		let BinaryInst 	= {pred: inst.pred, rd: inst.des, rs1: inst.s1, op2: inst.s2};
		let CompInst 	= {pred: inst.pred, pd: inst.des, rs1: inst.s1, op2: inst.s2};
		let LoadInst 	= {pred: inst.pred, rd: inst.des, ra: inst.s1, imm: inst.s2};
		let MulInst 	= {pred: inst.pred, rs1: inst.s1, rs2: inst.s2};
		let PredInst 	= {pred: inst.pred, pd: inst.des, ps1: inst.s1, ps2: inst.s2};
		//let StackInst 	= {};
		let StoreInst 	= {pred: inst.pred, ra: inst.des, rs: inst.s1, imm: inst.s2};

		switch(inst.type) {
			// BinaryArithmetics
			case "add": 
			case "addi": 
			case "addl": 
				cInst = new Add(BinaryInst);
				cInst.execute(state);
				break;
			case "sub":
				cInst = new Sub(BinaryInst);
				cInst.execute(state);
				break;
			case "xor":
				cInst = new Xor(BinaryInst);
				cInst.execute(state);
				break;
			case "nor": 
				cInst = new Nor(BinaryInst);
				cInst.execute(state);
				break;
			case "sl": 
				cInst = new ShiftLeft(BinaryInst);
				cInst.execute(state);
				break;
			case "sr": 
				cInst = new ShiftRight(BinaryInst);
				cInst.execute(state);
				break;
			case "sra": 
				cInst = new ShiftRightArithmetic(BinaryInst);
				cInst.execute(state);
				break;
			case "shadd": 
				cInst = new ShiftAdd(BinaryInst);
				cInst.execute(state);
				break;
			case "shadd2": 
				cInst = new ShiftAdd2(BinaryInst);
				cInst.execute(state);
				break;
			
			// Compare
			case "btest": 
				cInst = new Btest(CompInst);
				cInst.execute(state);
				break;
			case "cmpeq": 
				cInst = new Cmpeq(CompInst);
				cInst.execute(state);
				break;
			case "cmple": 
				cInst = new Cmple(CompInst);
				cInst.execute(state);
				break;
			case "cmplt": 
				cInst = new Cmplt(CompInst);
				cInst.execute(state);
				break;
			case "cmpneq": 
				cInst = new Cmpneq(CompInst);
				cInst.execute(state);
				break;
			case "cmpule": 
				cInst = new Cmpule(CompInst);
				cInst.execute(state);
				break;
			case "cmpult": 
				cInst = new Cmpult(CompInst);
				cInst.execute(state);
				break;
			
			// LoadType 
			case "lbc": 
				cInst = new Lbc(LoadInst);
				cInst.execute(state);
				break;
			case "lbl": 
				cInst = new Lbl(LoadInst);
				cInst.execute(state);
				break;
			case "lbm": 
				cInst = new Lbm(LoadInst);
				cInst.execute(state);
				break;
			case "lbs": 
				cInst = new Lbs(LoadInst);
				cInst.execute(state);
				break;
			case "lbuc": 
				cInst = new Lbuc(LoadInst);
				cInst.execute(state);
				break;
			case "lbul": 
				cInst = new Lbul(LoadInst);
				cInst.execute(state);
				break;
			case "lbum": 
				cInst = new Lbum(LoadInst);
				cInst.execute(state);
				break;
			case "lbus": 
				cInst = new Lbus(LoadInst);
				cInst.execute(state);
				break;
			case "lhc": 
				cInst = new Lhc(LoadInst);
				cInst.execute(state);
				break;
			case "lhl": 
				cInst = new Lhl(LoadInst);
				cInst.execute(state);
				break;
			case "lhm": 
				cInst = new Lhm(LoadInst);
				cInst.execute(state);
				break;
			case "lhs": 
				cInst = new Lhs(LoadInst);
				cInst.execute(state);
				break;
			case "lhuc": 
				cInst = new Lhuc(LoadInst);
				cInst.execute(state);
				break;
			case "lhul": 
				cInst = new Lhul(LoadInst);
				cInst.execute(state);
				break;
			case "lhum": 
				cInst = new Lhum(LoadInst);
				cInst.execute(state);
				break;
			case "lhus": 
				cInst = new Lhus(LoadInst);
				cInst.execute(state);
				break;
			case "lwc": 
				cInst = new Lwc(LoadInst);
				cInst.execute(state);
				break;
			case "lwl": 
				cInst = new Lwl(LoadInst);
				cInst.execute(state);
				break;
			case "lwm": 
				cInst = new Lwm(LoadInst);
				cInst.execute(state);
				break;
			case "lws": 
				cInst = new Lws(LoadInst);
				cInst.execute(state);
				break;
			
			// Multiply 
			case "mul":
				cInst = new Mul(MulInst);
				cInst.execute(state);
				break;
			case "mulu":
				cInst = new Mulu(MulInst);
				cInst.execute(state);
				break;

			// Predicate
			case "pand":
				cInst = new Pand(PredInst);
				cInst.execute(state);
				break;
			case "por":
				cInst = new Por(PredInst);
				cInst.execute(state);
				break;
			case "pxor":
				cInst = new Pxor(PredInst);
				cInst.execute(state);
				break;

			// StoreTyped
			case "sbc":
				cInst = new Sbc(StoreInst);
				cInst.execute(state);
				break;
			case "sbl":
				cInst = new Sbl(StoreInst);
				cInst.execute(state);
				break;
			case "sbm":
				cInst = new Sbm(StoreInst);
				cInst.execute(state);
				break;
			case "sbs":
				cInst = new Sbs(StoreInst);
				cInst.execute(state);
				break;
			case "shc":
				cInst = new Shc(StoreInst);
				cInst.execute(state);
				break;
			case "shl":
				cInst = new Shl(StoreInst);
				cInst.execute(state);
				break;
			case "shm":
				cInst = new Shm(StoreInst);
				cInst.execute(state);
				break;
			case "shs":
				cInst = new Shs(StoreInst);
				cInst.execute(state);
				break;
			case "swc":
				cInst = new Swc(StoreInst);
				cInst.execute(state);
				break;
			case "swl":
				cInst = new Swl(StoreInst);
				cInst.execute(state);
				break;
			case "swm":
				cInst = new Swm(StoreInst);
				cInst.execute(state);
				break;
			case "sws":
				cInst = new Sws(StoreInst);
				cInst.execute(state);
				break;

			// Rest
			case "bcopy":
				cInst = new Bcopy();
				cInst.execute(state);
				break;
			case "mfs":
				cInst = new Mfs();
				cInst.execute(state);
				break;
			case "mts":
				cInst = new Mts();
				cInst.execute(state);
				break;
			default:
				console.log(`Instruction ${inst.type} not implemented.`);
		}
		console.log(`Instruction ${inst.type} executed by CPU.`)
	}

	render() {
		return(
			<div>
				{this.pickInst(this, {pred: 0, type: "add", des: "r1", s1: "r3", s2: 10})}
				Reg: {this.reg["r1"]}
			</div>
		)
	}
}

export default CPU;