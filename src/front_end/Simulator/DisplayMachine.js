import React, { Fragment } from "react";

const DisplayMachine = () => {
	return (
		<Fragment>
			<textarea
				className = "col-12"
				placeholder = "Machine Code"
				readOnly
			/>	
		</Fragment>
	)
}

export default DisplayMachine;
