import React from "react";
import PropTypes from "prop-types";
import DisplayButtons from "./DisplayButtons";
import DisplayConsole from "./DisplayConsole";
import DisplayStorage from "./DisplayStorage";
import DisplayCode from "./DisplayCode";
import "../../css/Simulator.css";

/**
 * Simulator: Handles all the displaying under the "Simulator" tab.
 * @param {number}	props.queLength		- Length of instruction que
 * @param {number}	props.pc			- Current CPU program counter
 * @param {func}	props.runClick		- Button run clicked handler
 * @param {func}	props.stepClick		- Button step clicked handler
 * @param {func}	props.prevClick		- Button prev clicked handler
 * @param {func}	props.resetClick	- Button reset clicked handler
 * @param {array}	props.instQue 		- Array of all instructions in queue
 * @param {array}	props.originalCode	- Array of all the instructions input into the code editor
 * @param {array}	props.binary		- Array of all instructions in queue converted to binaries
 * @param {Object} 	props.registers 	- Object containing all register values with the reg as key. r0-r31, p0-p7, s0-s15
 * @param {Object} 	props.cache			- Object containing all the caches of the program. 
 * @param {string} 	props.consoleOutput - The output string to console.
 */
const Simulator = (props) => {
	return(
		<div className="sim">
			<div className="col-8 col-xl-9 sim-child">
				<DisplayButtons 
					stepClick = {props.stepClick} 
					runClick = {props.runClick}
					prevClick = {props.prevClick}
					resetClick = {props.resetClick}
					queLength = {props.queLength}
					pc = {props.pc}
				/>
				<DisplayCode
					instQue = {props.instQue}
					pc = {props.pc}
					binary = {props.binary}
					originalCode = {props.originalCode}
				/>
				<DisplayConsole
					consoleOutput = {props.consoleOutput}
				/>
			</div>

			<div className="col-4 col-xl-3 reg-container">
				<DisplayStorage
					registers = {props.registers}
					cache = {props.cache}
				/>
			</div>
		</div>
	);
};

Simulator.propTypes = {
	queLength 		: PropTypes.number,
	pc 				: PropTypes.number,
	runClick 		: PropTypes.func,
	stepClick		: PropTypes.func,
	prevClick 		: PropTypes.func,
	resetClick 		: PropTypes.func,
	instQue 		: PropTypes.array,
	originalCode 	: PropTypes.array,
	binary 			: PropTypes.array,
	consoleOutput 	: PropTypes.string,
	registers 		: PropTypes.object,
	cache 			: PropTypes.object,
};

export default Simulator;
