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
					{GenMachineRows(props.instQue, props.pseudo, props.pc, props.binary)}
				</tbody>
			</table>
		</div>
	);
};

const GenMachineRows = (instQue, originalInst, pc, binary) => {
	let rows = [];

	for (let i = 0; i < instQue.length; i++) {
		rows.push(MachineRow(instQue[i], originalInst[i], binary[i], pc, i));
	}
	return rows;
};

const MachineRow = (inst, originalInst, binary, pc, i) => {
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

export default DisplayCode;
