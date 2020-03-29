import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DisplayEditor from "./_DisplayEditor";
import Simulator from "./xSimulator/Simulator";

/**
 * FrontEnd: Handles the entire front end of Chora. Splits into two tabs: Editor and Simulator.
 */
const FrontEnd = (props) => {
	return (
		<Fragment>
			<ul className ="nav nav-tabs justify-content-center">
				<li className="nav-item">
					<a href="#editor" className="nav-link active" data-toggle="tab" role="tab">Editor</a>
				</li>
				<li className="nav-item">
					<a href="#simulator" className="nav-link" data-toggle="tab" role="tab">Simulator</a>
				</li>
			</ul>

			<div className="tab-content no-scroll">
				<div role="tabpanel" className="tab-pane active" id="editor">
					<DisplayEditor
						editorUpdate = {props.editorUpdate}
					/>
				</div>
				<div role="tabpanel" className="tab-pane" id="simulator">
					<Simulator
						memory = {props.memory}
						stepClick = {props.stepClick}
						runClick = {props.runClick}
						prevClick = {props.prevClick}
						resetClick = {props.resetClick}
						consoleOutput = {props.consoleOutput}
						registers = {props.registers}
						pc = {props.pc}
						bundles = {props.bundles}
					/>
				</div>
			</div>
		</Fragment>
	);
};

FrontEnd.propTypes = {
	editorUpdate 	: PropTypes.func,
	pc 				: PropTypes.number,
	runClick 		: PropTypes.func,
	stepClick		: PropTypes.func,
	prevClick 		: PropTypes.func,
	resetClick 		: PropTypes.func,
	bundles			: PropTypes.object,
	consoleOutput 	: PropTypes.string,
	registers 		: PropTypes.object,
	memory 			: PropTypes.object,
};

export default FrontEnd;
