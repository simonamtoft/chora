import React from "react";
import PropTypes from "prop-types";
import "../../css/Simulator.css";
import { intToHex } from "../../helpers/misc";

/**
 * DisplayCode: Displays all the instructions in the instruction queue as machine, basic and original code.
 * @param {array}	props.instQue 		- Array of all instructions in queue
 * @param {array}	props.originalCode	- Array of all the instructions input into the code editor
 * @param {number}	props.pc			- Current CPU program counter
 * @param {array}	props.binary		- Array of all instructions in queue converted to binaries
 */
const DisplayCode = (props) => {
	return (
		<div className="machine-container">
			<table className="table table-hover table-sm">
				<thead>
					<tr>
						<th scope="col">Machine Code</th>
						<th scope="col">Basic Code</th>
						<th scope="col">Original Code</th>
					</tr>
				</thead>
				<tbody>
					{GenMachineRows(props.instQue, props.originalCode, props.pc, props.binary)}
				</tbody>
			</table>
		</div>
	);
};

/**
 * GenMachineRows: Generates all code table rows. 
 * Done by calling MachineRow on each index of instQue and orginalCode.
 * @param {array}	instQue 		- Array of all instructions in queue
 * @param {array}	originalCode	- Array of all the instructions input into the code editor
 * @param {number}	pc				- Current CPU program counter
 * @param {array}	binary			- Array of all instructions in queue converted to binaries
 */
const GenMachineRows = (instQue, originalCode, pc, binary) => {
	let rows = [];

	for (let i = 0; i < instQue.length; i++) {
		rows.push(MachineRow(instQue[i], originalCode[i], pc, binary[i], i));
	}
	return rows;
};

/**
 * MachineRow: Generates one row of the table: Binary | Basic Code | Original code
 * Highlights row if current row is the same as program counter (i = pc).
 * @param {array}	instQue 		- Array of all instructions in queue
 * @param {array}	originalCode	- Array of all the instructions input into the code editor
 * @param {number}	pc				- Current CPU program counter
 * @param {array}	binary			- Array of all instructions in queue converted to binaries
 * @param {number} 	i				- Current row 
 */
const MachineRow = (inst, originalInst, pc, binary, i) => {
	let idx = 0, color = "";
	if (pc === i) {
		color = "current-inst";
	}

	if (inst !== originalInst) { idx = 1; }

	return(
		<tr key={i} className={color} >
			<td>{intToHex(binary)}</td>
			<td>{inst[1]} {inst[2]} {inst[3]} {inst[4]}</td>
			<td>{originalInst[1-idx]} {originalInst[2-idx]} {originalInst[3-idx]} {originalInst[4-idx]}</td>
		</tr>
	);
};

DisplayCode.propTypes = {
	instQue 		: PropTypes.number,
	originalCode 	: PropTypes.array,
	pc 				: PropTypes.number,
	binary 			: PropTypes.array,
};


export default DisplayCode;
