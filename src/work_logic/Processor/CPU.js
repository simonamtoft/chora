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
import Registers from "../Memory/Registers";

class CPU extends Component {
    constructor() {
		super();
		this.reg = new Registers();
	}
	
	reset() {
		this.reg.resetReg();
		// Also reset memory here
	}

	execute(instruction) {
		this.pickInst(this.reg, instruction);
	}

	pickInst = (state, inst) => {
		let cInst; // Placeholder to execute inst
	
		// Convert inst into the needed types of instructions
		let BinaryInst 	= {pred: inst.pred, rd: inst.des, rs1: inst.s1, op2: inst.s2};
		let CompInst 	= {pred: inst.pred, pd: inst.des, rs1: inst.s1, op2: inst.s2};
		let LoadInst 	= {pred: inst.pred, rd: inst.des, ra: inst.s1, imm: inst.s2};
		let MulInst 	= {pred: inst.pred, rs1: inst.des, rs2: inst.s1};
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
			case "subi":
			case "subl":
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
				cInst = new Bcopy({pred: inst.pred, rd: inst.des, rs1: inst.s1, imm: inst.s2}); //missing ps?
				cInst.execute(state);
				break;
			case "mfs":
				cInst = new Mfs({pred: inst.pred, rd: inst.des, ss: inst.s1});
				cInst.execute(state);
				break;
			case "mts":
				cInst = new Mts({pred: inst.pred, rs1: inst.s1, sd: inst.des}); // not sure if SD is correct set
				cInst.execute(state);
				break;
			default:
				console.log(`Instruction ${inst.type} not implemented.`);
				return -1;
		}
		console.log(`Instruction ${inst.type} executed.`)
	}

	render() {return}
}

export default CPU;
