import React, { Component } from "react";
import UserButtons from "./UserButtons";
import ConsoleOutput from "./ConsoleOutput";
import DisplayReg from "./DisplayReg";
import DisplayMachine from "./DisplayMachine";

class UserEditor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
			<div className="modal-body row">
				<div className="col-9">
					<UserButtons 
						stepInst = {this.props.stepInst} 
						runInst = {this.props.runInst}
						resetInst = {this.props.resetInst}
					/>      
					<DisplayMachine/>
					<ConsoleOutput
						console = {this.props.console}
					/>
				</div>

				<div className="col-3">
					<DisplayReg/>
				</div>
			</div>
				
			
        );
    }
}

export default UserEditor;
