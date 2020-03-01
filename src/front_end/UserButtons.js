/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";
import "../css/Buttons.css";

class UserButtons extends Component {
    constructor(props) {
        super(props);
        this.textEditor = React.createRef();
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
	        <div>
	            <button type="button" className="btn step col-md-4" onClick={this.stepInst}>Step</button>
	            <button type="button" className="btn run col-md-4" onClick={this.runInst}>Run</button>
	            <button type="button" className="btn reset col-md-4" onClick={this.resetInst}>Reset</button>
	        </div>  
	    );
	}
}

export default UserButtons;
