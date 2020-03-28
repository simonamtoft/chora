import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { intToHex } from "../../helpers/misc";
import "../../css/Simulator.css";

const tableCSS = "table table-hover table-sm col-12";

/**
 * DisplayStorage: Displays two tabs that shows all values in registers and memory with corresponding addresses. 
 * @param {Object} props.registers 	- Object containing all register values with the reg as key. r0-r31, p0-p7, s0-s15
 * @param {Object} props.memory		- Object containing the global memory of the program. 
 */
const DisplayStorage = (props) => {
	return (
		<div>
			<ul className ="nav nav-tabs justify-content-center">
				<li className="nav-item">
					<a href="#registers" className="nav-link active" data-toggle="tab" role="tab">Registers</a>
				</li>
				<li className="nav-item">
					<a href="#gm" className="nav-link" data-toggle="tab" role="tab">Global Memory (gm)</a>
				</li>
			</ul>

			<div className="tab-content table-scrolling">
				<div role="tabpanel" className="tab-pane active" id="registers">
					{RenderRegTable(props.registers)}
				</div>
				<div role="tabpanel" className="tab-pane" id="gm">
					{RenderMemoryTable(props.memory)}
				</div>
			</div>
		</div>
	);
};

/**
 * RenderRegTable: Returns the register table with columns Register, Decimal, Hexadecimal
 * @param {Object} registers - Object containing all register values with the reg as key. r0-r31, p0-p7, s0-s15
 */
const RenderRegTable = (registers) => {
	var rows = [];

	// Generate rows: 32 r-, 16 s-, and 8 p-rows.
	for (let i = 0; i < 32; i++) {
		rows.push(RegRow("r", i, registers));
	}
	for (let i = 0; i < 16; i++) {
		rows.push(RegRow("s", i, registers));
	}
	for (let i = 0; i < 8; i++) {
		rows.push(RegRow("p", i, registers));
	}

	// Return table
	return (
		<table className={tableCSS}>
			<thead>
				<tr>
					<th scope="col">Register</th>
					<th scope="col">Decimal</th>
					<th scope="col">Hexadecimal</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	);
};

/**
 * RenderMemoryTable: Returns the memory table with columns Address, +0, +1, +2, +3
 * @param {Object} props.memory		- Object containing the memory of the program. 
 */
const RenderMemoryTable = (memory) => {
	let key, gm_temp, rows = [];

	// We don't want to display these fields:
	gm_temp = memory;
	delete gm_temp["BASE_ADDR"];
	delete gm_temp["MAX_SIZE"];

	// Generate rows
	let keys = Object.keys(gm_temp);
	for (let i = 0; i < keys.length; i += 4) {
		key = Number(keys[i]);
		rows.push(MemoryRow(gm_temp, key));
	}

	// Return table
	return (
		<table className={tableCSS}>
			<thead>
				<tr>
					<th scope="col">Address</th>
					<th scope="col">+0</th>
					<th scope="col">+1</th>
					<th scope="col">+2</th>
					<th scope="col">+3</th>
				</tr>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
	);
};

/**
 * MemoryRow: Returns one row of the memory table.
 * @param {Object} memory - Object containing the global memory of the program. 
 */
const MemoryRow = (memory, key) => {
	return(
		<tr key={key}>
			<th scope="row">{intToHex(key)}</th>
			<td>{memory[`${key}`]}</td>
			<td>{memory[`${key+1}`]}</td>
			<td>{memory[`${key+2}`]}</td>
			<td>{memory[`${key+3}`]}</td>
		</tr>
	);
};

/**
 * RegRow: Returns one row of the register table.
 * @param {string} letter 		- Either r, p or s
 * @param {number} idx 			- Current idx of the register
 * @param {Object} registers 	- Object containing all register values with the reg as key. r0-r31, p0-p7, s0-s15
 */
const RegRow = (letter, idx, registers) => {
	let val = registers[`${letter}${idx}`];

	return(
		<tr key={`${letter}${idx}`}>
			<th scope="row">{letter}{idx}</th>
			<td>{val}</td>
			<td>{intToHex(val)}</td>
		</tr>
	);
};

DisplayStorage.propTypes = {
	registers 	: PropTypes.object,
	memory 		: PropTypes.object,
};


export default DisplayStorage;
