import React, { Fragment } from "react";
import "../../css/Buttons.css";

const UserButtons = (props) => {
	return(
		<Fragment>
			<button type="button" className="btn step col-4" onClick={props.stepClick}>Step</button>
			<button type="button" className="btn run col-4" onClick={props.runClick}>Run</button>
			<button type="button" className="btn reset col-4" onClick={props.resetClick}>Reset</button>
		</Fragment>  
	);
}

export default UserButtons;
