import CPU from "./CPU";
import { getInstType, instTypes, binTypes, compTypes, loadTypes, storeTypes, predTypes } from "../../helpers/typeStrings";
import { pseudoTypes, pseudoMapping } from "../../helpers/pseudo";
import { regStr, pregStr, sregStr, allRegStr } from "../../helpers/regStrings";
import { getRegEx } from "../../helpers/regEx";

/**
 * Removes empty lines and comments
 * @param 	{string} 	editor 		- User input editor 
 * @returns {array}		output		- Array of lines that are not empty or comments
 */
const cleanInput = (editor) => {
	let input = editor.split(/(?:\r?\n)|;/);
	let output = [];
	for (let i = 0; i < input.length; ++i){
		let line = input[i].split("#", 1)[0].trim();
		let only_label = line.match(/^\w+:$/);
		if(line){
			if(only_label && i + 1 < input.length){
				input[i+1] = only_label[0] + input[i+1];
			}
			else if(!only_label && line){
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
		this.binary = [];
		this.offset = 0;
		this.cpu = new CPU();
	}

	reset() {
		this.bundles = [];
		this.binary = [];
		this.labels = {};
		this.offset = 0;
		this.cpu = new CPU();
	}

	run(editor) {
		this.reset();
		let input = cleanInput(editor);
		for (let line of input)
			if(!this.parse(line))
				return false;
		for (let bundle of this.bundles)
			if(!this.resolveLabels(bundle))
				return false;
		return true;
	}
		
	parse(line) {
		let insts = line.split("||");
		let bundle = {offset: this.offset, instructions: []};
		let idx = this.bundles.push(bundle) - 1;
		if(insts.length > 2)
			return false;
		for(let inst of insts){
			inst = inst.trim();
			let match = inst.match(getRegEx("first"));
			if (!match)	return false;
			let label = match[1];
			let neg   = match[2] === "!";
			let pred  = match[3] ? Number(match[3].toLowerCase().replace("p","")) : 0;
			let type  = match[4].toLowerCase();
			match = inst.match(getRegEx(type));
			if (!match) return false;
			if(pseudoTypes.includes(type)){
				let ptype = type.toUpperCase();
				switch(ptype){
					case "LI":
						if(Number(match[2] < 0)){
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
					default:
						break;
				}
				let pinst = pseudoMapping[ptype].replace(/{(\d+)}/g, (_, n) => match[n]);
				type = pinst.match(getRegEx("first"))[4].toLowerCase();
				match = pinst.match(getRegEx(type));
				if (!match) return false;
			} else if (!instTypes.includes(type)){
				return false;
			}
			if(label) this.labels[label] = idx;
			// Re-add the operand checks at this point.
			let i = {pred: {p: pred, n: neg}, type, ops: match.slice(1), original: inst.replace(/\s+/gi, " ")};
			bundle.instructions.push(i);
			let is_long_imm = (binTypes.includes(type) && (Number(i.ops[2]) > 0xFFF));
			if(is_long_imm && insts.length === 2) return false;
			this.offset += is_long_imm ? 8 : 4;
		}
		return true;
	}

	resolveLabels(bundle){
		for(let instruction of bundle.instructions){
			for(let i in instruction.ops){
				if(Object.keys(this.labels).includes(instruction.ops[i]))
					instruction.ops[i] = this.bundles[this.labels[instruction.ops[i]]].offset;
				if(!allRegStr.includes(instruction.ops[i]) || isNaN(instruction.ops[i]))
					return false;
			}
		}
		return true;
	}
}
export default Assembler;
