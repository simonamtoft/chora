import React, { Fragment } from "react";
import "../../css/Buttons.css";

const buttonBS = [
	"btn button run col-3", 
	"btn button step col-3", 
	"btn button prev col-3",
	"btn button reset col-3"
];

const DisplayButtons = (props) => {
	if (props.queLength === 0) {
		return (
			<div className="button-container">
				{forwardBtn(props.queLength, props.instCount)}
				{backwardsBtn(props.instCount)}
			</div>  
		);
	} else {
		return (
			<div className="button-container">
				{forwardBtn(props.queLength, props.instCount, props.runClick, props.stepClick)}
				{backwardsBtn(props.instCount, props.prevClick, props.resetClick)}
			</div>  
		);
	}
};

// Handle step and run buttons
const forwardBtn = (queLength, instCount, runClick, stepClick) => {
	let tooltipRun = "Run all remaining instructions in queue";
	let tooltipStep = "Step next instruction in queue";

	if (queLength === 0 | queLength === instCount) {
		tooltipRun = "No instructions to run";
		tooltipStep = "No instructions to step";
		return (
			<Fragment>
				<button title={tooltipRun} type="button" className={buttonBS[0]} disabled>Run</button>
				<button title={tooltipStep} type="button" className={buttonBS[1]} disabled>Step</button>
			</Fragment>
		);
	}
	return (
		<Fragment>
			<button title={tooltipRun} type="button" className={buttonBS[0]} onClick={runClick}  >Run</button>
			<button title={tooltipStep} type="button" className={buttonBS[1]} onClick={stepClick} >Step</button>
		</Fragment>
	);
};

// Handle reset and prev buttons
const backwardsBtn = (instCount, prevClick, resetClick) => {
	let tooltipPrev = "Not implemented yet";
	let tooltipReset = "Reset registers & memory and jump to first instruction";
	if (instCount === 0) {
		tooltipReset = "No instructions run yet";
		return (
			<Fragment>
				<button title={tooltipPrev} type="button" className={buttonBS[2]} disabled>Prev</button>
				<button title={tooltipReset} type="button" className={buttonBS[3]} disabled>Reset</button>
			</Fragment>
		);
	}
	return (
		<Fragment>
			<button title={tooltipPrev} type="button" className={buttonBS[2]} onClick={prevClick} disabled >Prev</button>
			<button title={tooltipReset} type="button" className={buttonBS[3]} onClick={resetClick}>Reset</button>
		</Fragment>
	);
};


export default DisplayButtons;
