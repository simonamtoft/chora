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

const DisplayReg = (props) => {
	

	return (
		<Fragment>
			<table className="table table-striped table-sm tbody">
				<thead>
					<tr>
						<th scope="col">Register</th>
						<th scope="col">Decimal</th>
					</tr>
				</thead>
				<tbody>
					{RegRow({idx: 0, registers: props.registers})}
					{RegRow({idx: 1, registers: props.registers})}
					{RegRow({idx: 2, registers: props.registers})}
					{RegRow({idx: 3, registers: props.registers})}
					{RegRow({idx: 4, registers: props.registers})}
					{RegRow({idx: 5, registers: props.registers})}
					{RegRow({idx: 6, registers: props.registers})}
					{RegRow({idx: 7, registers: props.registers})}
					{RegRow({idx: 8, registers: props.registers})}
					{RegRow({idx: 9, registers: props.registers})}
					{RegRow({idx: 10, registers: props.registers})}
					{RegRow({idx: 11, registers: props.registers})}
					{RegRow({idx: 12, registers: props.registers})}
					{RegRow({idx: 13, registers: props.registers})}
					{RegRow({idx: 14, registers: props.registers})}
					{RegRow({idx: 15, registers: props.registers})}
					{RegRow({idx: 16, registers: props.registers})}
					{RegRow({idx: 17, registers: props.registers})}
					{RegRow({idx: 18, registers: props.registers})}
					{RegRow({idx: 19, registers: props.registers})}
					{RegRow({idx: 20, registers: props.registers})}
					{RegRow({idx: 21, registers: props.registers})}
					{RegRow({idx: 22, registers: props.registers})}
					{RegRow({idx: 23, registers: props.registers})}
					{RegRow({idx: 24, registers: props.registers})}
					{RegRow({idx: 25, registers: props.registers})}
					{RegRow({idx: 26, registers: props.registers})}
					{RegRow({idx: 27, registers: props.registers})}
					{RegRow({idx: 28, registers: props.registers})}
					{RegRow({idx: 29, registers: props.registers})}
					{RegRow({idx: 30, registers: props.registers})}
					{RegRow({idx: 31, registers: props.registers})}

				</tbody>
	  		</table>


			{/*<textarea
				className = "col-12"
				//placeholder = "Registers & Memory"
				value = {
					`r1 = ${props.registers["r1"]}\nr2 = ${props.registers["r2"]}\nr3 = ${props.registers["r3"]}\nr4 = ${props.registers["r4"]}`
				}
				readOnly
			/>	*/}
		</Fragment>
	)
}

export default DisplayReg;
