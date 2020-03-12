import React, { Fragment } from "react";
import { intToHex } from "../../helper";
import "../../css/Simulator.css"

const tableBS = "table table-hover table-sm col-12";

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
					{RenderCacheTable(props.cache.gm)}
				</div>
				<div role="tabpanel" className="tab-pane" id="lm">
					{RenderCacheTable(props.cache.lm)}
				</div>
				<div role="tabpanel" className="tab-pane" id="dc">
					{RenderCacheTable(props.cache.dc)}
				</div>
			</div>
		</Fragment>
	)
}

const RenderRegTable = (registers) => {
	return (
		<table className={tableBS}>
			<thead>
				<tr>
					<th scope="col">Register</th>
					<th scope="col">Decimal</th>
					<th scope="col">Hexadecimal</th>
				</tr>
			</thead>
			<tbody>
				{GenRegRows(registers)}
			</tbody>
		</table>
	)
}

const RenderCacheTable = (cache) => {
	return (
		<table className={tableBS}>
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
				{GenCacheRows(cache)}
			</tbody>
		</table>
	)
}

const GenCacheRows = (cache) => {
	let rows = [];
	let key, i;
	let size = Object.keys(cache).length;
	
	for (i = 0; i < size; i += 4) {
		key = Number(Object.keys(cache)[i]);
		key = key - (key%4);
		rows.push(CacheRow(cache, key))
	}

	return rows;
} 

const CacheRow = (cache, key) => {
	return(
		<tr>
			<th scope="row">{intToHex(key)}</th>
			<td>{cache[`${key}`]}</td>
			<td>{cache[`${key+1}`]}</td>
			<td>{cache[`${key+2}`]}</td>
			<td>{cache[`${key+3}`]}</td>
		</tr>
	)
}

const GenRegRows = (registers) => {
	var rows = [];

	for (let i = 0; i < 32; i++) {
		rows.push(RegRow("r", i, registers))
	}
	for (let i = 1; i < 16; i++) {
		rows.push(RegRow("s", i, registers))
	}
	for (let i = 0; i < 8; i++) {
		rows.push(RegRow("p", i, registers))
	}
	return rows;
}

const RegRow = (letter, idx, registers) => {
	let val = registers[`${letter}${idx}`];

	return(
		<tr>
			<th scope="row">{letter}{idx}</th>
			<td>{val}</td>
			<td>{intToHex(val)}</td>
		</tr>
	)
}

export default DisplayStorage;
