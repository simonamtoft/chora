import React from "react";
import PropTypes from "prop-types";
import "../../css/Simulator.css";
import { intToHex } from "../../helpers/misc";

/**
 * DisplayCode: Displays all the instructions in the instruction queue as machine, basic and original code.
 * @param {number}	props.pc			- Current CPU program counter
 * @param {array}	props.bundles		- Array of all instructions in queue converted to binaries
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
					{GenMachineRows(props.pc, props.bundles)}
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
const GenMachineRows = (pc, bundles) => {
	let rows = [];

	for (let o in bundles){
		rows.push(MachineRow(bundles[o], pc, o));
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
const MachineRow = (bundle, pc, i) => {
	let color = pc == i ? "current-inst" : "";
	let whatever = [];
	console.log(pc, i);
	for(let i of bundle){
		whatever.push(
			<tr key={i} className={color} >
				<td>{intToHex(i.instruction.binary[0])}</td>
				<td>{i.type} {i.ops.join(" ")}</td>
				<td>{i.original}</td>
			</tr>
		);
	}
	return whatever;
};

DisplayCode.propTypes = {
	pc 				: PropTypes.number,
	bundles			: PropTypes.array,
};


export default DisplayCode;
