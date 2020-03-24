import React, { Fragment } from "react";
import PropTypes from "prop-types";

const DisplayConsole = (props) => {
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
	);
};

DisplayConsole.propTypes = {
	consoleOutput : PropTypes.string
};


export default DisplayConsole;
