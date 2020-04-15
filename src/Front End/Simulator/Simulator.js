import React from "react";
import PropTypes from "prop-types";
import DisplayButtons from "./DisplayButtons";
import DisplayStorage from "./DisplayStorage";
import DisplayCode from "./DisplayCode";
import "../../CSS/Simulator.css";

/**
 * Simulator: Handles all the displaying under the "Simulator" tab.
 * @param {number}	props.pc			- Current CPU program counter
 * @param {func}	props.runClick		- Button run clicked handler
 * @param {func}	props.stepClick		- Button step clicked handler
 * @param {func}	props.prevClick		- Button prev clicked handler
 * @param {func}	props.resetClick	- Button reset clicked handler
 * @param {Object}	props.bundles 		- Object containing all instruction bundles from editor
 * @param {Object} 	props.registers 	- Object containing all register values with the reg as key. r0-r31, p0-p7, s0-s15
 * @param {Object} 	props.memory		- Object containing the global memory of the program
 * @param {string} 	props.consoleOutput - The output string to console
 */
const Simulator = (props) => {
	return(
		<div className="sim">
			<div className="col-8 col-xl-9 sim-child">
				<DisplayButtons 
					history = {props.history}
					stepClick = {props.stepClick} 
					runClick = {props.runClick}
					prevClick = {props.prevClick}
					resetClick = {props.resetClick}
					dumpClick = {props.dumpClick}
					pc = {props.pc}
					bundles = {props.bundles}
				/>
				<DisplayCode
					pc = {props.pc}
					bundles = {props.bundles}
				/>
			</div>

			<div className="col-4 col-xl-3 reg-container sim-child">
				<DisplayStorage
					registers = {props.registers}
					memory = {props.memory}
				/>
			</div>
		</div>
	);
};

Simulator.propTypes = {
	history         : PropTypes.array,
	pc 				: PropTypes.number,
	runClick 		: PropTypes.func,
	stepClick		: PropTypes.func,
	prevClick 		: PropTypes.func,
	resetClick 		: PropTypes.func,
	dumpClick		: PropTypes.func,
	bundles			: PropTypes.object,
	registers 		: PropTypes.object,
	memory 			: PropTypes.object,
};

export default Simulator;
