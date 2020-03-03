/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";

class DisplayMachine extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<React.Fragment>
				<textarea
					className = "col-12"
					placeholder = "Machine Code"
				/>	
			</React.Fragment>
		)
	}

}

export default DisplayMachine;
