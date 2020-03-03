import React from "react";
import UserButtons from "./UserButtons";
import ConsoleOutput from "./ConsoleOutput";
import DisplayReg from "./DisplayReg";
import DisplayMachine from "./DisplayMachine";

const Simulator = (props) => {
	return(
		<div className="modal-body row">
			<div className="col-9">
				<UserButtons 
					stepClick = {props.stepClick} 
					runClick = {props.runClick}
					resetClick = {props.resetClick}
				/>      
				<DisplayMachine/>
				<ConsoleOutput
					consoleOutput = {props.consoleOutput}
				/>
			</div>

			<div className="col-3">
				<DisplayReg/>
			</div>
		</div>
	)
}

export default Simulator;
