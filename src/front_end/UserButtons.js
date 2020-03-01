/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from "react";
import "../css/Buttons.css";

class UserButtons extends Component {
    constructor(props) {
        super(props);
        this.textEditor = React.createRef();
    }
	
	executeNextInstruction = () => {
	    this.props.executeNextInstruction();
	}

	executeInstructions = () => {
	    this.props.executeInstructions();
	}

	resetExecution = () => {
	    this.props.resetExecution();
	}

	render() {
	    return(
	        <div>
	            <button className="button next" onClick={this.executeNextInstruction}>Next</button>
	            <button className="button execute" onClick={this.executeInstructions}>Execute Instructions</button>
	            <button className="button reset" onClick={this.resetExecution}>Reset</button>
	        </div>  
	    );
	}
}

export default UserButtons;
