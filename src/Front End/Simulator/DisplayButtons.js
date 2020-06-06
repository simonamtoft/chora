import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "../../CSS/Buttons.css";

const buttonCSS = [
	"btn button run col-2", 
	"btn button step col-2", 
	"btn button prev col-2",
	"btn button reset col-2",
	"btn button dump col-2",
];

/**
 * DisplayButtons: Handles display of buttons and returns clicks of buttons.
 * @param {object} 	props.bundles		- Object consisting of all instruction bundles from editor
 * @param {number}	props.pc			- Current CPU program counter
 * @param {func}	props.runClick		- Button run clicked handler
 * @param {func}	props.stepClick		- Button step clicked handler
 * @param {func}	props.prevClick		- Button prev clicked handler
 * @param {func}	props.resetClick	- Button reset clicked handler
 */
const DisplayButtons = (props) => {
	return (
		<div className="button-container">
			{forwardBtn(props.bundles, props.pc, props.runClick, props.stepClick)}
			{backwardsBtn(props.history, props.prevClick, props.resetClick)}
			<button type ="button" className={buttonCSS[4]} onClick = {props.dumpClick}>Dump</button>
		</div>  
	);
};

/**
 * fowardBtn: Handles the two buttons "Run" and "Step".
 * Disables the buttons if no instructions left in queue.
 * @param {Object} 	bundles 	- Object consisting of all instruction bundles from editor
 * @param {number} 	pc 			- Current CPU program counter
 * @param {func} 	runClick 	- Button run clicked handler
 * @param {func} 	stepClick 	- Button step clicked handler
 */
const forwardBtn = (bundles, pc, runClick, stepClick) => {
	let tooltipRun = "Run all remaining instructions in queue";
	let tooltipStep = "Step next instruction in queue";

	if (!bundles[pc]) {
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
 * @param {} 		history		- Current CPU program counter
 * @param {func} 	prevClick 	- Button prev clicked handler
 * @param {func} 	resetClick 	- Button reset clicked handler
 */
const backwardsBtn = (history, prevClick, resetClick) => {
	let tooltipPrev = "Steps one instruction back (decrement program count)";
	let tooltipReset = "Reset registers & memory and jump to first instruction";

	if (history.length === 0) {
		tooltipReset = "No instructions run yet";
		tooltipPrev = "No instructions run yet";
		return (
			<Fragment>
				<button title={tooltipPrev} type="button" className={buttonCSS[2]} disabled>Prev</button>
				<button title={tooltipReset} type="button" className={buttonCSS[3]} disabled>Reset</button>
			</Fragment>
		);
	}
	return (
		<Fragment>
			<button title={tooltipPrev} type="button" className={buttonCSS[2]} onClick={prevClick}  >Prev</button>
			<button title={tooltipReset} type="button" className={buttonCSS[3]} onClick={resetClick}>Reset</button>
		</Fragment>
	);
};

DisplayButtons.propTypes = {
	history     : PropTypes.array,
	bundles 	: PropTypes.object,
	pc 			: PropTypes.number,
	runClick 	: PropTypes.func,
	stepClick	: PropTypes.func,
	prevClick 	: PropTypes.func,
	resetClick 	: PropTypes.func,
	dumpClick	: PropTypes.func,
};


export default DisplayButtons;
