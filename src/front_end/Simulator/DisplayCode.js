import React from "react";
import "../../css/Simulator.css";
import { intToHex } from "../../helpers/misc";

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
					{GenMachineRows(props.instQue, props.pseudo, props.instCount, props.binary)}
				</tbody>
			</table>
		</div>
	);
};

const GenMachineRows = (instQue, originalInst, instCount, binary) => {
	let rows = [];

	for (let i = 0; i < instQue.length; i++) {
		rows.push(MachineRow(instQue[i], originalInst[i], binary[i], instCount, i));
	}
	return rows;
};

const MachineRow = (inst, originalInst, binary, instCount, i) => {
	let color = "";
	if (instCount === i) {
		color = "current-inst";
	}

	if (inst === undefined) {
		inst = [" ", "inst", "is", "undefined", "!"];
	}
	if (originalInst === undefined)  {
		originalInst = [" ", "inst", "is", "undefined", "!"];
	}

	return(
		<tr key={i} className={color} >
			<td>{intToHex(binary)}</td>
			<td>{inst[1]} {inst[2]} {inst[3]} {inst[4]}</td>
			<td>{originalInst[0]} {originalInst[1]} {originalInst[2]} {originalInst[3]}</td>
		</tr>
	);
};

export default DisplayCode;
