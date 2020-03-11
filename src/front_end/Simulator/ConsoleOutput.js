import React, { Fragment } from "react";

const ConsoleOutput = (props) => {
	return (
		<Fragment>
			<textarea
				type="text"
				className = "col-12 console-container"
				placeholder = "Console Output"
				value={props.consoleOutput}
				readOnly
			/>	
		</Fragment>
	)
}

export default ConsoleOutput;
