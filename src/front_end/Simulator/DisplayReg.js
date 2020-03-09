import React, { Fragment } from "react";
import "../../css/Simulator.css"
import { addressToHex } from "../../helper";

const DisplayReg = (props) => {
	return (
		<Fragment>
			<ul className ="nav nav-tabs justify-content-center">
				<li className="nav-item">
					<a href="#registers" className="nav-link active" data-toggle="tab" role="tab">Reg</a>
				</li>
				<li className="nav-item">
					<a href="#memory" className="nav-link" data-toggle="tab" role="tab">Mem</a>
				</li>
			</ul>

			<div className="tab-content">
				<div role="tabpanel" className="tab-pane active" id="registers">
					{RenderRegTable(props.registers)}
				</div>
				<div role="tabpanel" className="tab-pane" id="memory">
					{RenderCacheTable(props.cache)}
				</div>
			</div>
		</Fragment>
	)
}

const RenderCacheTable = (cache) => {
	return (
		<table className="table table-striped table-sm reg-table col-12">
			<thead>
				<tr>
					<th scope="col">Address</th>
					<th scope="col">Decimal</th>
				</tr>
			</thead>
			<tbody>
				{GenCacheRows(cache)}
			</tbody>
		</table>
	)
}

const GenCacheRows = (cache) => {
	var rows = [];
	var key;

	for (key in cache.sc) {
		rows.push(CacheRow(cache.sc, key))
	}
	for (key in cache.gm) {
		rows.push(CacheRow(cache.gm, key))
	}
	for (key in cache.lm) {
		rows.push(CacheRow(cache.lm, key))
	}
	for (key in cache.dc) {
		rows.push(CacheRow(cache.dc, key))
	}

	return rows;
} 

const CacheRow = (cache, key) => {
	return(
		<tr>
			<th scope="row">{addressToHex(key)}</th>
			<td>{cache[`${key}`]}</td>
		</tr>
	)
}

const RenderRegTable = (registers) => {
	return (
		<table className="table table-striped table-sm reg-table col-12">
			<thead>
				<tr>
					<th scope="col">Register</th>
					<th scope="col">Decimal</th>
				</tr>
			</thead>
			<tbody>
				{GenRegRows(registers)}
			</tbody>
		</table>
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
	return(
		<tr>
			<th scope="row">{letter}{idx}</th>
			<td>{registers[`${letter}${idx}`]}</td>
		</tr>
	)
}

export default DisplayReg;
