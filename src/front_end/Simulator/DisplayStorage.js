import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { intToHex } from "../../helpers/misc";
import "../../css/Simulator.css";

const tableCSS = "table table-hover table-sm col-12";

/**
 * DisplayStorage: Displays two tabs that shows all values in registers and memory with corresponding addresses. 
 * @param {Object} props.registers 	- Object containing all register values with the reg as key. r0-r31, p0-p7, s0-s15
 * @param {Object} props.cache		- Object containing all the caches of the program. 
 */
const DisplayStorage = (props) => {
	return (
		<Fragment>
			<ul className ="nav nav-tabs justify-content-center">
				<li className="nav-item">
					<a href="#registers" className="nav-link active" data-toggle="tab" role="tab">Reg</a>
				</li>
				<li className="nav-item">
					<a href="#sc" className="nav-link" data-toggle="tab" role="tab">sc</a>
				</li>
				<li className="nav-item">
					<a href="#gm" className="nav-link" data-toggle="tab" role="tab">gm</a>
				</li>
				<li className="nav-item">
					<a href="#lm" className="nav-link" data-toggle="tab" role="tab">lm</a>
				</li>
				<li className="nav-item">
					<a href="#dc" className="nav-link" data-toggle="tab" role="tab">dc</a>
				</li>
			</ul>

			<div className="tab-content table-scrolling">
				<div role="tabpanel" className="tab-pane active" id="registers">
					{RenderRegTable(props.registers)}
				</div>
				<div role="tabpanel" className="tab-pane" id="sc">
					{RenderCacheTable(props.cache.sc)}
				</div>
				<div role="tabpanel" className="tab-pane" id="gm">
					{RenderCacheTable(props.cache.mem)}
				</div>
				<div role="tabpanel" className="tab-pane" id="lm">
					{RenderCacheTable(props.cache.lm)}
				</div>
				<div role="tabpanel" className="tab-pane" id="dc">
					{RenderCacheTable(props.cache.dc)}
				</div>
			</div>
		</Fragment>
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
	for (let i = 1; i < 16; i++) {
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
 * RenderCacheTable: Returns the cache table with columns Address, +0, +1, +2, +3
 * @param {Object} cache - Object containing all the caches of the program. 
 */
const RenderCacheTable = (cache) => {
	let rows = [];
	let key, i, ctemp, size;
	
	// We don't want to display these fields:
	ctemp = cache;
	delete ctemp["BASE_ADDR"];
	delete ctemp["MAX_SIZE"];
	
	// Generate rows
	size = Object.keys(ctemp).length;
	for (i = 0; i < size; i += 4) {
		key = Number(Object.keys(ctemp)[i]);
		key = key - (key%4);
		rows.push(CacheRow(ctemp, key));
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
 * CacheRow: Returns one row of the cache table.
 * @param {Object} cache - Object containing all the caches of the program. 
 */
const CacheRow = (cache, key) => {
	return(
		<tr key={key}>
			<th scope="row">{intToHex(key)}</th>
			<td>{cache[`${key}`]}</td>
			<td>{cache[`${key+1}`]}</td>
			<td>{cache[`${key+2}`]}</td>
			<td>{cache[`${key+3}`]}</td>
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
	cache 		: PropTypes.object,
};


export default DisplayStorage;
