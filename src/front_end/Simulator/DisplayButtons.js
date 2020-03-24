import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../../css/Buttons.css";

const buttonCSS = [
	"btn button run col-3", 
	"btn button step col-3", 
	"btn button prev col-3",
	"btn button reset col-3"
];

/**
 * DisplayButtons: Handles display of buttons and returns clicks of buttons.
 * @param {number}	props.queLength		- Length of instruction que
 * @param {number}	props.pc			- Current CPU program counter
 * @param {func}	props.runClick		- Button run clicked handler
 * @param {func}	props.stepClick		- Button step clicked handler
 * @param {func}	props.prevClick		- Button prev clicked handler
 * @param {func}	props.resetClick	- Button reset clicked handler
 */
const DisplayButtons = (props) => {
	if (props.queLength === 0) {
		return (
			<div className="button-container">
				{forwardBtn(props.queLength, props.pc, props.runClick, props.stepClick)}
				{backwardsBtn(props.pc, props.prevClick, props.resetClick)}
			</div>  
		);
	}
	return (
		<div className="button-container">
			{forwardBtn(props.queLength, props.pc, props.runClick, props.stepClick)}
			{backwardsBtn(props.pc, props.prevClick, props.resetClick)}
		</div>  
	);
};

/**
 * fowardBtn: Handles the two buttons "Run" and "Step".
 * Disables the buttons if no instructions left in queue.
 * @param {number} 	queLength 	- Length of instruction queue
 * @param {number} 	pc 			- Current CPU program counter
 * @param {func} 	runClick 	- Button run clicked handler
 * @param {func} 	stepClick 	- Button step clicked handler
 */
const forwardBtn = (queLength, pc, runClick, stepClick) => {
	let tooltipRun = "Run all remaining instructions in queue";
	let tooltipStep = "Step next instruction in queue";

	if (queLength === 0 | queLength === pc) {
		tooltipRun = "No instructions to run";
		tooltipStep = "No instructions to step";
		return (
			<Fragment>
				<button title={tooltipRun} type="button" className={buttonCSS[0]} disabled>Run</button>
				<button title={tooltipStep} type="button" className={buttonCSS[1]} disabled>Step</button>
			</Fragment>
		);
	}
	return (
		<Fragment>
			<button title={tooltipRun} type="button" className={buttonCSS[0]} onClick={runClick}  >Run</button>
			<button title={tooltipStep} type="button" className={buttonCSS[1]} onClick={stepClick} >Step</button>
		</Fragment>
	);
};

/**
 * backwardsBtn: Handles the two buttons "Prev" and "Reset".
 * Disables the buttons if no instructions has been executed yet.
 * @param {number} 	pc 			- Current CPU program counter
 * @param {func} 	prevClick 	- Button prev clicked handler
 * @param {func} 	resetClick 	- Button reset clicked handler
 */
const backwardsBtn = (pc, prevClick, resetClick) => {
	let tooltipPrev = "Not implemented yet";
	let tooltipReset = "Reset registers & memory and jump to first instruction";

	if (pc === 0) {
		tooltipReset = "No instructions run yet";
		return (
			<Fragment>
				<button title={tooltipPrev} type="button" className={buttonCSS[2]} disabled>Prev</button>
				<button title={tooltipReset} type="button" className={buttonCSS[3]} disabled>Reset</button>
			</Fragment>
		);
	}
	return (
		<Fragment>
			<button title={tooltipPrev} type="button" className={buttonCSS[2]} onClick={prevClick} disabled >Prev</button>
			<button title={tooltipReset} type="button" className={buttonCSS[3]} onClick={resetClick}>Reset</button>
		</Fragment>
	);
};

DisplayButtons.propTypes = {
	queLength 	: PropTypes.number,
	pc 			: PropTypes.number,
	runClick 	: PropTypes.func,
	stepClick	: PropTypes.func,
	prevClick 	: PropTypes.func,
	resetClick 	: PropTypes.func,
};


export default DisplayButtons;
