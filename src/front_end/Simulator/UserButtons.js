import React from "react";
import "../../css/Buttons.css";

const UserButtons = (props) => {
	let buttonBS = [
		"btn button run col-3", 
		"btn button step col-3", 
		"btn button prev col-3",
		"btn button reset col-3"
	];

	if (props.queLength === 0) {
		return (
			<div className="button-container">
				<button type="button" className={buttonBS[0]} disabled>Run</button>
				<button type="button" className={buttonBS[1]} disabled>Step</button>
				<button type="button" className={buttonBS[2]} disabled>Prev</button>
				<button type="button" className={buttonBS[3]} disabled>Reset</button>
			</div>  
		)
	} else {
		return (
			<div className="button-container">
				<button type="button" className={buttonBS[0]} onClick={props.runClick}  >Run</button>
				<button type="button" className={buttonBS[1]} onClick={props.stepClick} >Step</button>
				<button type="button" className={buttonBS[2]} onClick={props.prevClick} disabled >Prev</button>
				<button type="button" className={buttonBS[3]} onClick={props.resetClick}>Reset</button>
			</div>  
		)
	}
}

export default UserButtons;
