import React, { Component } from "react";
import PropTypes from "prop-types";
import { intToHex } from "../../Helpers/misc";
import "../../CSS/Simulator.css";
import "../../CSS/Buttons.css";
import "../../CSS/App.css";

const tableCSS = "table table-hover table-sm col-12";
const maxSize = 0x00200000;

class DisplayStorage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pagenumber: 1,
			pageRows : 0,
			maxPage : 0,
		};

		this.incPage = this.incPage.bind(this);
		this.decPage = this.decPage.bind(this);
		this.jumpPage = this.jumpPage.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}

	updateDimensions() {
		let pageRows = Math.floor((window.innerHeight - 220) / 35); // row 34.6
		this.setState({ 
			pageRows	: pageRows,
			maxPage		: Math.ceil(maxSize / (pageRows*4)),
		});
	}

	UNSAFE_componentWillMount() {
		this.updateDimensions();
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	incPage() {
		if ((this.state.pagenumber+1) <= this.state.maxPage)
			this.setState((prevState) => ({ pagenumber: prevState.pagenumber + 1 }));
	}

	decPage() {
		if (this.state.pagenumber > 1)
			this.setState((prevState) => ({ pagenumber: prevState.pagenumber - 1 }));
	}

	jumpPage() {
		let des = parseInt(Number(prompt("What address do you want to jump to? Both hexadecimal and decimal numbers accepted.")), 10) / (this.state.pageRows*4);
		if (des <= this.state.maxPage) 
			this.setState(() => ({ pagenumber: Math.floor(des)+1 }));
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

				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active table-scrolling" id="registers">
						{RenderRegTable(this.props.registers)}
					</div>
					<div role="tabpanel" className="tab-pane" id="gm">
						{RenderMemoryTable(this.props.memory, this.state.pagenumber, this.state.pageRows)}
						<div>
							<button type="button" className="btn button page-btn col-4" onClick={this.decPage}>Prev</button>
							<button type="button" className="btn button page-btn col-4" onClick={this.incPage}>Next</button>
							<button type="button" className="btn button page-btn col-4" onClick={this.jumpPage}>Jump</button>
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

	// This row overflows when scrolled all the way down. 
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
			<thead className="header-stick">
				<tr className="header-stick">
					<th className="header-stick" scope="col">Register</th>
					<th className="header-stick" scope="col">Decimal</th>
					<th className="header-stick" scope="col">Hexadecimal</th>
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
const RenderMemoryTable = (memory, pagenumber, pageRows) => {
	let gm_temp, rows = [];

	let startAddr = (pagenumber-1)*pageRows*4;
	let endAddr = pagenumber*pageRows*4;

	// We don't want to display these fields:
	gm_temp = Object.assign({}, memory);
	delete gm_temp["BASE_ADDR"];
	delete gm_temp["MAX_SIZE"];
	delete gm_temp["TEXT_END"];

	for (let i = startAddr; i < endAddr; i+= 4) {
		i <= maxSize ? rows.push(MemoryRow(gm_temp, i)) : rows.push(emptyRow(i));
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

const emptyRow = (key) => {
	return(
		<tr key={key}>
			<td>----------</td>
			<td>---</td>
			<td>---</td>
			<td>---</td>
			<td>---</td>
		</tr>
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
			<td>{letter}{idx}</td>
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
