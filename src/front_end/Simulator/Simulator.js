import React from "react";
import UserButtons from "./UserButtons";
import ConsoleOutput from "./ConsoleOutput";
import DisplayReg from "./DisplayReg";
import DisplayMachine from "./DisplayMachine";
import "../../css/Simulator.css"

const Simulator = (props) => {
	return(
		<div className="sim">
			<div className="col-8 col-xl-9 sim-child">
				<UserButtons 
					stepClick = {props.stepClick} 
					runClick = {props.runClick}
					prevClick = {props.prevClick}
					resetClick = {props.resetClick}
					queLength = {props.queLength}
				/>
				<DisplayMachine
					machineOutput = {props.machineOutput}
				/>
				<ConsoleOutput
					consoleOutput = {props.consoleOutput}
				/>
			</div>

			<div className="col-4 col-xl-3 reg-container">
				<DisplayReg
					registers = {props.registers}
					cache = {props.cache}
				/>
			</div>
		</div>
	)
}

export default Simulator;
