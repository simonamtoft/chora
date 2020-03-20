import React, { Fragment } from "react";
import DisplayEditor from "./DisplayEditor";
import Simulator from "./Simulator/Simulator";

const FrontEnd = (props) => {
	// if (false) { // props.canRun === 
	// 	return (
	// 		<Fragment>
	// 			<ul className ="nav nav-tabs justify-content-center">
	// 				<li className="nav-item">
	// 					<a href="#editor" className="nav-link active" data-toggle="tab" role="tab">Editor</a>
	// 				</li>
	// 				<li className="nav-item">
	// 					<a href="#simulator" className="nav-link disabled" data-toggle="tab" role="tab">Simulator</a>
	// 				</li>
	// 			</ul>

	// 			<div className="tab-content">
	// 				<div role="tabpanel" className="tab-pane active" id="editor">
	// 					<DisplayEditor
	// 						parentCallback = {props.parentCallback}
	// 					/>
	// 				</div>
	// 				<div role="tabpanel" className="tab-pane" id="simulator">
	// 				</div>
	// 			</div>
	// 		</Fragment>
	// 	);
	//} else {
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

			<div className="tab-content">
				<div role="tabpanel" className="tab-pane active" id="editor">
					<DisplayEditor
						parentCallback = {props.parentCallback}
					/>
				</div>
				<div role="tabpanel" className="tab-pane" id="simulator">
					<Simulator
						cache = {props.cache}
						stepClick = {props.stepClick}
						runClick = {props.runClick}
						prevClick = {props.prevClick}
						resetClick = {props.resetClick}
						consoleOutput = {props.consoleOutput}
						registers = {props.registers}
						queLength = {props.queLength}
						instQue = {props.instQue}
						instCount = {props.instCount}
						binary = {props.binary}
					/>
				</div>
			</div>
		</Fragment>
	);
	//}
};

export default FrontEnd;
