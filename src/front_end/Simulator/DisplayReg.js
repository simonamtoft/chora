import React, { Fragment } from "react";
import "../../css/DisplayReg.css"

const RegRow = ({idx, registers}) => {
	return(
		<tr>
			<th scope="row">r{idx}</th>
			<td>{registers[`r${idx}`]}</td>
		</tr>
	)
}

const SregRow = ({idx, registers}) => {
	return(
		<tr>
			<th scope="row">s{idx}</th>
			<td>{registers[`s${idx}`]}</td>
		</tr>
	)
}

const PregRow = ({idx, registers}) => {
	return(
		<tr>
			<th scope="row">p{idx}</th>
			<td>{registers[`p${idx}`]}</td>
		</tr>
	)
}
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
					{RenderRegTable({registers: props.registers})}
				</div>
				<div role="tabpanel" className="tab-pane" id="memory">

				</div>
			</div>
		</Fragment>
	)
}

// Render the 31 reg, 15 sreg and 8 predicate values in the table
const RenderRegTable = ({registers}) => {
	return (
		<table className="table table-striped table-sm tbody col-12">
			<thead>
				<tr>
					<th scope="col">Register</th>
					<th scope="col">Decimal</th>
				</tr>
			</thead>
			<tbody>
				{RegRow({idx: 0, registers: registers})}
				{RegRow({idx: 1, registers: registers})}
				{RegRow({idx: 2, registers: registers})}
				{RegRow({idx: 3, registers: registers})}
				{RegRow({idx: 4, registers: registers})}
				{RegRow({idx: 5, registers: registers})}
				{RegRow({idx: 6, registers: registers})}
				{RegRow({idx: 7, registers: registers})}
				{RegRow({idx: 8, registers: registers})}
				{RegRow({idx: 9, registers: registers})}
				{RegRow({idx: 10, registers: registers})}
				{RegRow({idx: 11, registers: registers})}
				{RegRow({idx: 12, registers: registers})}
				{RegRow({idx: 13, registers: registers})}
				{RegRow({idx: 14, registers: registers})}
				{RegRow({idx: 15, registers: registers})}
				{RegRow({idx: 16, registers: registers})}
				{RegRow({idx: 17, registers: registers})}
				{RegRow({idx: 18, registers: registers})}
				{RegRow({idx: 19, registers: registers})}
				{RegRow({idx: 20, registers: registers})}
				{RegRow({idx: 21, registers: registers})}
				{RegRow({idx: 22, registers: registers})}
				{RegRow({idx: 23, registers: registers})}
				{RegRow({idx: 24, registers: registers})}
				{RegRow({idx: 25, registers: registers})}
				{RegRow({idx: 26, registers: registers})}
				{RegRow({idx: 27, registers: registers})}
				{RegRow({idx: 28, registers: registers})}
				{RegRow({idx: 29, registers: registers})}
				{RegRow({idx: 30, registers: registers})}
				{RegRow({idx: 31, registers: registers})}
				{SregRow({idx: 1, registers: registers})}
				{SregRow({idx: 2, registers: registers})}
				{SregRow({idx: 3, registers: registers})}
				{SregRow({idx: 4, registers: registers})}
				{SregRow({idx: 5, registers: registers})}
				{SregRow({idx: 6, registers: registers})}
				{SregRow({idx: 7, registers: registers})}
				{SregRow({idx: 8, registers: registers})}
				{SregRow({idx: 9, registers: registers})}
				{SregRow({idx: 10, registers: registers})}
				{SregRow({idx: 11, registers: registers})}
				{SregRow({idx: 12, registers: registers})}
				{SregRow({idx: 13, registers: registers})}
				{SregRow({idx: 14, registers: registers})}
				{SregRow({idx: 15, registers: registers})}
				{PregRow({idx: 0, registers: registers})}
				{PregRow({idx: 1, registers: registers})}
				{PregRow({idx: 2, registers: registers})}
				{PregRow({idx: 3, registers: registers})}
				{PregRow({idx: 4, registers: registers})}
				{PregRow({idx: 5, registers: registers})}
				{PregRow({idx: 6, registers: registers})}
				{PregRow({idx: 7, registers: registers})}
			</tbody>
		</table>
	)
}

export default DisplayReg;
