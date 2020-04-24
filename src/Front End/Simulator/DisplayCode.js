import React from "react";
import PropTypes from "prop-types";
import { intToHexStr } from "../../Helpers/misc";
import "../../CSS/Simulator.css";

/**
 * DisplayCode: Displays all the instructions in the instruction queue as machine, basic and original code.
 * @param {number}	props.pc		- Current CPU program counter
 * @param {Object}	props.bundles	- Object consisting of all instruction bundles from editor
 */
const DisplayCode = (props) => {
	return (
		<div className="code-container">
			<table className="table table-hover table-sm" id="displaycode">
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
 * Done by calling MachineRow on each bundle in bundles. 
 * @param {Object}	props.bundles	- Object consisting of all instruction bundles from editor
 * @param {number}	pc				- Current CPU program counter
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
 * @param {Object}	bundles	- Object consisting of all instruction bundles from editor
 * @param {number}	pc		- Current CPU program counter
 * @param {number} 	addr	- Current bundle address 
 */
const MachineRow = (bundle, pc, addr) => {
	let idx = 0;
	let color = pc === Number(addr) ? "current-inst" : "";
	let rows = [];
	
	for(let i of bundle){
		rows.push(
			<tr key={idx} className={color} >
				<td>{intToHexStr(i.instruction.binary[0], 8)}</td>
				<td>{i.instruction.toString()}</td>
				<td>{i.original}</td>
			</tr>
		);
		idx++;
	}
	return rows;
};

DisplayCode.propTypes = {
	pc 				: PropTypes.number,
	bundles			: PropTypes.object,
};

export default DisplayCode;
