/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";
import "../../css/Buttons.css";

class UserButtons extends Component {
    constructor(props) {
        super(props);
    }
	
	stepInst = () => {
	    this.props.stepInst();
	}

	runInst = () => {
	    this.props.runInst();
	}

	resetInst = () => {
	    this.props.resetInst();
	}

	render() {
	    return(
	        <React.Fragment>
	            <button type="button" className="btn step col-4" onClick={this.stepInst}>Step</button>
	            <button type="button" className="btn run col-4" onClick={this.runInst}>Run</button>
	            <button type="button" className="btn reset col-4" onClick={this.resetInst}>Reset</button>
	        </React.Fragment>  
	    );
	}
}

export default UserButtons;
