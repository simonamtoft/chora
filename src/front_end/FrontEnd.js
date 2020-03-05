import React, { Fragment } from "react";
import UserEditor from "./UserEditor";
import Simulator from "./Simulator/Simulator";

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

			<div className="tab-content">
				<div role="tabpanel" className="tab-pane active" id="editor">
					<UserEditor
						parentCallback = {props.parentCallback}
					/>
				</div>
				<div role="tabpanel" className="tab-pane" id="simulator">
					<Simulator
						stepClick = {props.stepClick}
						runClick = {props.runClick}
						resetClick = {props.resetClick}
						consoleOutput = {props.consoleOutput}
					/>
				</div>
			</div>
		</Fragment>
		
	)
}

export default FrontEnd;
