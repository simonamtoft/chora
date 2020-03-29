import React, { Component } from "react";
import PropTypes from "prop-types";
import { intToHex } from "../../helpers/misc";
import "../../css/Simulator.css";
import "../../css/Buttons.css";
import "../../css/App.css";

const tableCSS = "table table-hover table-sm col-12";
const pageRows = 23;

class DisplayStorage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagenumber: 1,
		};
		this.incPage = this.incPage.bind(this);
		this.decPage = this.decPage.bind(this);
	}

	incPage() {
		console.log( (this.state.pagenumber+1)*21*4);
		if ((this.state.pagenumber+1)*pageRows*4 < 0x00200000)
			this.setState((prevState) => ({ pagenumber: prevState.pagenumber + 1 }));
	}

	decPage() {
		if (this.state.pagenumber > 1)
			this.setState((prevState) => ({ pagenumber: prevState.pagenumber - 1 }));
	}

	render() {
		return(
			<div>
				<ul className ="nav nav-tabs justify-content-center">
					<li className="nav-item">
						<a href="#registers" className="nav-link active" data-toggle="tab" role="tab">Registers</a>
					</li>
					<li className="nav-item">
						<a href="#gm" className="nav-link" data-toggle="tab" role="tab">Memory</a>
					</li>
				</ul>

				<div className="tab-content table-scrolling">
					<div role="tabpanel" className="tab-pane active" id="registers">
						{RenderRegTable(this.props.registers)}
					</div>
					<div role="tabpanel" className="tab-pane" id="gm">
						{RenderMemoryTable(this.props.memory, this.state.pagenumber)}
						<div>
							<button type="button" className="btn button page-btn" onClick={this.decPage}>Prev Page</button>
							<button type="button" className="btn button page-btn" onClick={this.incPage}>Next Page</button>
						</div>
					</div>
				</div>
			</div>	
		);
	}
}

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

	rows.push(
		<tr key={"bottom"}>
			<th>---</th>
			<td>---</td>
			<td>---</td>
		</tr>
	);

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
const RenderMemoryTable = (memory, pagenumber) => {
	let gm_temp, rows = [];

	let startAddr = (pagenumber-1)*pageRows*4;
	let endAddr = pagenumber*pageRows*4;

	// We don't want to display these fields:
	gm_temp = memory;
	delete gm_temp["BASE_ADDR"];
	delete gm_temp["MAX_SIZE"];

	for (let i = startAddr; i < endAddr; i+= 4) {
		rows.push(MemoryRow(gm_temp, i));
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
			<td>{intToHex(key)}</td>
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
