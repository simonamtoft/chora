import React, { Component } from "react";
import { frontEnd } from "../../App";

class ConsoleOutput extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<React.Fragment>
				<frontEnd.Consumer>
					{consoleOutput => 
						<textarea
							type="text"
							className = "col-12"
							placeholder = "Console Output"
							value={consoleOutput}
						/>	
					}
				</frontEnd.Consumer>
				
			</React.Fragment>
		)
	}

}

export default ConsoleOutput;
