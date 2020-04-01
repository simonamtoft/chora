import { Add, Sub, Xor, Nor, ShiftLeft, ShiftRight, Or, And, ShiftRightArithmetic, ShiftAdd, ShiftAdd2 } from "../Instructions/Binary Arithmetics/index";
import { Btest, Cmpeq, Cmple, Cmplt, Cmpneq, Cmpule, Cmpult } from "../Instructions/Compare/index";
import { Br, Brcf, Brcfnd, Brnd, Call, Callnd, Ret, Retnd, Trap, Xret, Xretnd } from "../Instructions/Control Flow/index";
import { Lws, Lwl, Lwc, Lwm, Lhs, Lhl, Lhc, Lhm, Lbs, Lbl, Lbc, Lbm, Lhus, Lhul, Lhuc, Lhum, Lbus, Lbul, Lbuc, Lbum } from "../Instructions/Load Typed/index";
import { Mul, Mulu } from "../Instructions/Multiply/index";
import { Pand, Pxor, Por } from "../Instructions/Predicate/index";
import { Sens, Sfree, Sres, Sspill } from "../Instructions/Stack Control/index";
import { Sbc, Sbl, Sbm, Sbs, Shc, Shl, Shm, Shs, Swc, Swl, Swm, Sws } from "../Instructions/Store Typed/index";
import Bcopy from "../Instructions/Bcopy";
import Mfs from "../Instructions/Mfs";
import Mts from "../Instructions/Mts";
import { instTypes, binTypes, allowedPipelineTwo, pseudoTypes, pseudoMapping } from "../../Helpers/typeStrings";
import { regStr, allRegStr, sregMap } from "../../Helpers/regStrings";
import { getRegEx, getRegExError } from "../../Helpers/regEx";

/**
 * Removes empty lines and comments
 * @param 	{string} 	editor 		- User input editor 
 * @returns {array}		output		- Array of lines that are not empty or comments
 */
const cleanInput = (editor) => {
	let input = editor.split(/(?:\r?\n)|;/);
	let output = [];
	for (let i = 0; i < input.length; ++i) {
		let line = input[i].split("#", 1)[0].trim(); // Remove comments
		let only_label = line.match(/^\w+:$/);
		if (line) {
			if (only_label && i + 1 < input.length) {
				input[i + 1] = only_label[0] + " " + input[i + 1];
			} else if (!only_label && line) {
				output.push(line);
			}
		}
	}
	return output;
};

class Assembler {
	constructor() {
		this.bundles = [];
		this.labels = {};
		this.offset = 0;
		this.error = [];
	}

	reset() {
		this.bundles = [];
		this.labels = {};
		this.offset = 0;
		this.error = [];
	}

	// should add debouncing :)
	run(editor) {
		this.reset();
		let input = cleanInput(editor);
		for (let line of input)
			if(!this.parse(line))
				return false;
		for (let bundle of this.bundles) {
			if(!this.resolveOperands(bundle))
				return false;
			this.compileBundle(bundle);
		}
		return true;
	}

	parse(line) {
		let insts = line.split("||");
		let bundle = { offset: this.offset, instructions: [] };
		let idx = this.bundles.push(bundle) - 1;
		
		/* Perhaps change to is_data and and different regex for .word, .string etc. */
		/* Figure out how to handle base and pc when a .word n+4 is injected into the asm as that indicates a code block that is n bytes...
		let is_word = line.match(/\.word\s+((?:0[bx])?\d+)$/i);
		if(is_word) {
			bundle.is_data = true;
			bundle.data = {type: "word", value: Number(is_word[1])};
			this.offset += 4;
			return true;
		}
		*/

		if (insts.length > 2) {
			this.error[idx] = "Only two instructions per bundle allowed!";
			return false;
		}
			
		for (let j in insts) {
			let inst = insts[j];
			inst = inst.trim();
			
			// Get instruction match
			let match = inst.match(getRegEx("first"));
			if (!match) { 
				this.error[idx] = getRegExError("first"); 
				return false; 
			}
			let label = match[1];
			let neg = match[2] === "!";
			let pred = match[3] ? Number(match[3].toLowerCase().replace("p", "")) : 0;
			let type = match[4].toLowerCase();
			match = inst.match(getRegEx(type));
			
			// Check if inst is a proper instruction
			if (!instTypes.includes(type)) {
				this.error[idx] = `${type} is not an instruction`;
				return false; 
			} else if (!match){
				this.error[idx] = getRegExError(type); 
				return false; 
			}

			// Re-write pseudo instruction into its corresponding instruction
			if (pseudoTypes.includes(type)) {
				let ptype = type.toUpperCase();
				switch (ptype) {
					case "LI":
						if (Number(match[2] < 0)) {
							ptype = "LI_NEG";
							match[2] = -match[2];
						} else {
							ptype = "LI_POS";
						}
						break;
					case "MOV":
						ptype += (regStr.includes(match[1])) ? "_R" : "_P";
						ptype += (regStr.includes(match[2])) ? "R" : "P";
						break;
					default: break;
				}

				// Get the original instruction and get its match
				let basic = pseudoMapping[ptype].replace(/{(\d+)}/g, (_, n) => match[n]);
				type = basic.match(getRegEx("first"))[4].toLowerCase();
				match = basic.match(getRegEx(type));
			}

			// Define the instruction
			let i = { pred: { p: pred, n: neg }, type, ops: match.slice(1), original: inst.replace(/\s+/gi, " ") };
			let is_long_imm = (binTypes.includes(type) && (Number(i.ops[2]) > 0xFFF));
			
			// Check if pipelined/bundled correctly
			if (insts.length === 2) {
				if (is_long_imm) {
					this.error[idx] = "Can't bundle a 64-bit instruction with anything else";
					return false;
				} else if (j === 1 && !allowedPipelineTwo(type)) {
					this.error[idx] = `${type} can't run in pipeline two.`;
					return false;
				}
			}

			if (label) this.labels[label] = idx;
			bundle.instructions.push(i);
			this.offset += is_long_imm ? 8 : 4;
		}
		return true;
	}

	resolveOperands(bundle) {
		let idx = bundle.offset/4;
		for (let instruction of bundle.instructions) {
			for (let i in instruction.ops) {
				let op = instruction.ops[i];
				let op_lc = op.toLowerCase();
				if (sregMap[op_lc]) {
					instruction.ops[i] = sregMap[op_lc];
				} else if (allRegStr.includes(op_lc)) {
					instruction.ops[i] = op_lc;
				} else if (Object.keys(this.labels).includes(op)) {
					instruction.ops[i] = String(this.bundles[this.labels[op]].offset);
				} else if (instruction.type === "bcopy" && op === "~" && Number(i) === 3) {
					continue;
				} else if (isNaN(op)) {
					this.error[idx] = "Can't resolve operands";
					return false;
				}		
			}
		}
		return true;
	}

	compileBundle(bundle) {
		for (let i in bundle.instructions) {
			let cInst;
			let { pred, type, ops } = bundle.instructions[i];
			let predicate = pred.p | (pred.n << 3);

			let BinaryInst 	= { pred: predicate, rd:  ops[0], rs1: ops[1], op2: ops[2] };
			let CompareInst = { pred: predicate, pd:  ops[0], rs1: ops[1], op2: ops[2] };
			let ControlInst = { pred: predicate, s1:  ops[0], s2 : ops[1] };
			let LoadInst 	= { pred: predicate, rd:  ops[0], ra:  ops[1], imm: ops[2] };
			let MulInst 	= { pred: predicate, rs1: ops[0], rs2: ops[1] };
			let PredInst 	= { pred: predicate, pd:  ops[0], ps1: ops[1], ps2: ops[2] };
			let StackInst 	= { pred: predicate, s1:  ops[0] };
			let StoreInst 	= { pred: predicate, ra:  ops[0], imm: ops[1], rs:  ops[2] };
			let BcopyInst 	= { pred: predicate, rd:  ops[0], rs1: ops[1], imm: ops[2], neg: ops[3], ps: ops[4] };

			// Pick inst from its name/type
			switch (type) {
				// BinaryArithmetics
				case "add":
				case "addi":
				case "addl":
					cInst = new Add(BinaryInst);
					break;
				case "sub":
				case "subi":
				case "subl":
					cInst = new Sub(BinaryInst);
					break;
				case "or":
				case "ori":
				case "orl":
					cInst = new Or(BinaryInst);
					break;
				case "and":
				case "andi":
				case "andl":
					cInst = new And(BinaryInst);
					break;
				case "xor":
				case "xori":
				case "xorl":
					cInst = new Xor(BinaryInst);
					break;
				case "nor":
				case "norl":
					cInst = new Nor(BinaryInst);
					break;
				case "sl":
				case "sli":
				case "sll":
					cInst = new ShiftLeft(BinaryInst);
					break;
				case "sr":
				case "sri":
				case "srl":
					cInst = new ShiftRight(BinaryInst);
					break;
				case "sra":
				case "srai":
				case "sral":
					cInst = new ShiftRightArithmetic(BinaryInst);
					break;
				case "shadd":
					cInst = new ShiftAdd(BinaryInst);
					break;
				case "shadd2":
					cInst = new ShiftAdd2(BinaryInst);
					break;

				// Compare
				case "btest":
				case "btesti":
					cInst = new Btest(CompareInst);
					break;
				case "cmpeq":
				case "cmpeqi":
					cInst = new Cmpeq(CompareInst);
					break;
				case "cmple":
				case "cmplei":
					cInst = new Cmple(CompareInst);
					break;
				case "cmplt":
				case "cmplti":
					cInst = new Cmplt(CompareInst);
					break;
				case "cmpneq":
				case "cmpneqi":
					cInst = new Cmpneq(CompareInst);
					break;
				case "cmpule":
				case "cmpulei":
					cInst = new Cmpule(CompareInst);
					break;
				case "cmpult":
				case "cmpulti":
					cInst = new Cmpult(CompareInst);
					break;

				// LoadType 
				case "lbc":
					cInst = new Lbc(LoadInst);
					break;
				case "lbl":
					cInst = new Lbl(LoadInst);
					break;
				case "lbm":
					cInst = new Lbm(LoadInst);
					break;
				case "lbs":
					cInst = new Lbs(LoadInst);
					break;
				case "lbuc":
					cInst = new Lbuc(LoadInst);
					break;
				case "lbul":
					cInst = new Lbul(LoadInst);
					break;
				case "lbum":
					cInst = new Lbum(LoadInst);
					break;
				case "lbus":
					cInst = new Lbus(LoadInst);
					break;
				case "lhc":
					cInst = new Lhc(LoadInst);
					break;
				case "lhl":
					cInst = new Lhl(LoadInst);
					break;
				case "lhm":
					cInst = new Lhm(LoadInst);
					break;
				case "lhs":
					cInst = new Lhs(LoadInst);
					break;
				case "lhuc":
					cInst = new Lhuc(LoadInst);
					break;
				case "lhul":
					cInst = new Lhul(LoadInst);
					break;
				case "lhum":
					cInst = new Lhum(LoadInst);
					break;
				case "lhus":
					cInst = new Lhus(LoadInst);
					break;
				case "lwc":
					cInst = new Lwc(LoadInst);
					break;
				case "lwl":
					cInst = new Lwl(LoadInst);
					break;
				case "lwm":
					cInst = new Lwm(LoadInst);
					break;
				case "lws":
					cInst = new Lws(LoadInst);
					break;

				// Multiply 
				case "mul":
					cInst = new Mul(MulInst);
					break;
				case "mulu":
					cInst = new Mulu(MulInst);
					break;

				// Predicate
				case "pand":
					cInst = new Pand(PredInst);
					break;
				case "por":
					cInst = new Por(PredInst);
					break;
				case "pxor":
					cInst = new Pxor(PredInst);
					break;

				// StoreTyped
				case "sbc":
					cInst = new Sbc(StoreInst);
					break;
				case "sbl":
					cInst = new Sbl(StoreInst);
					break;
				case "sbm":
					cInst = new Sbm(StoreInst);
					break;
				case "sbs":
					cInst = new Sbs(StoreInst);
					break;
				case "shc":
					cInst = new Shc(StoreInst);
					break;
				case "shl":
					cInst = new Shl(StoreInst);
					break;
				case "shm":
					cInst = new Shm(StoreInst);
					break;
				case "shs":
					cInst = new Shs(StoreInst);
					break;
				case "swc":
					cInst = new Swc(StoreInst);
					break;
				case "swl":
					cInst = new Swl(StoreInst);
					break;
				case "swm":
					cInst = new Swm(StoreInst);
					break;
				case "sws":
					cInst = new Sws(StoreInst);
					break;

				// Stack Control
				case "sens":
					cInst = new Sens(StackInst);
					break;
				case "sfree":
					cInst = new Sfree(StackInst);
					break;
				case "sres":
					cInst = new Sres(StackInst);
					break;
				case "sspill":
					cInst = new Sspill(StackInst);
					break;

				// Control Flow 
				case "br":
					cInst = new Br(ControlInst);
					break;
				case "brcf":
					cInst = new Brcf(ControlInst);
					break;
				case "brcfnd":
					cInst = new Brcfnd(ControlInst);
					break;
				case "brnd":
					cInst = new Brnd(ControlInst);
					break;
				case "call":
					cInst = new Call(ControlInst);
					break;
				case "callnd":
					cInst = new Callnd(ControlInst);
					break;
				case "ret":
					cInst = new Ret(ControlInst);
					break;
				case "retnd":
					cInst = new Retnd(ControlInst);
					break;
				case "trap":
					cInst = new Trap(ControlInst);
					break;
				case "xret":
					cInst = new Xret(ControlInst);
					break;
				case "xretnd":
					cInst = new Xretnd(ControlInst);
					break; 

				// Rest
				case "bcopy":
					cInst = new Bcopy(BcopyInst);
					break;
				case "mfs":
					cInst = new Mfs({ pred: pred.p | (pred.n << 3), rd: ops[0], ss: ops[1] });
					break;
				case "mts":
					cInst = new Mts({ pred: pred.p | (pred.n << 3), rs1: ops[0], sd: ops[1] });
					break;

				// nop when generated by compiler
				case "nop":
					return;

				// Not implemented
				default:
					console.log(`Instruction ${type} not implemented.`);
					return -1;
			}
			if (i === 0 && bundle.instructions.length === 2) {
				cInst.binary[0] |= 1 << 31;
			}
			bundle.instructions[i].instruction = cInst;
		}
	}
}
export default Assembler;
