import React from "react";
import PropTypes from "prop-types";
import DisplayButtons from "./DisplayButtons";
import DisplayConsole from "./DisplayConsole";
import DisplayStorage from "./DisplayStorage";
import DisplayCode from "./DisplayCode";
import "../../css/Simulator.css";

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
					pseudo = {props.pseudo}
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
	instQue 		: PropTypes.number,
	pseudo 			: PropTypes.array,
	binary 			: PropTypes.array,
	consoleOutput 	: PropTypes.string,
	registers 		: PropTypes.object,
	cache 			: PropTypes.object,
};

export default Simulator;
