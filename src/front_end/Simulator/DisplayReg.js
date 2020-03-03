/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component, Fragment } from "react";

class DisplayReg extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Fragment>
				<textarea
					className = "col-12"
					placeholder = "Registers & Memory"
				/>	
			</Fragment>
		)
	}

}

export default DisplayReg;
