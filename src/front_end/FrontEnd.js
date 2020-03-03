/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";
import UserEditor from "./UserEditor";
import Simulator from "./Simulator/Simulator";

class FrontEnd extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<React.Fragment>
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
							parentCallback = {this.props.parentCallback}
						/> {/**/}
					</div>
					<div role="tabpanel" className="tab-pane" id="simulator">
						<Simulator
							stepInst = {this.props.stepInst}
							runInst = {this.props.runInst}
							resetInst = {this.props.resetInst}
							consoleOutput = {this.props.consoleOutput}
						/>
					</div>
				</div>
			</React.Fragment>
			
		)
	}

}

export default FrontEnd;
