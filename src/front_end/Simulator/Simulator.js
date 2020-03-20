import React from "react";
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
					instCount = {props.instCount}
				/>
				<DisplayCode
					instQue = {props.instQue}
					instCount = {props.instCount}
					binary = {props.binary}
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

export default Simulator;
