import React, { Component } from "react";
import CodeMirror from "react-codemirror";
import PropTypes from "prop-types";
import "../../node_modules/codemirror/lib/codemirror.css";
import "./patmos-mode";
//import "../../node_modules/codemirror/mode/patmos/patmos";

class Editor extends Component{
	constructor(props) {
		super(props);
		this.state = {
			code: "",
			readOnly: false,
			mode: "patmos",
			lint: true,
		};

		this.updateCode = this.updateCode.bind(this);
	}

	updateCode (newCode) {
		this.setState({
			code: newCode,
		});
		this.props.editorUpdate(newCode);
	}

	render() {
		let options = {
			mode: this.state.mode,
			lineNumbers: true,
		};
		return(
			<div><CodeMirror value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true}/></div>
		);
	}
}

Editor.propTypes = {
	editorUpdate : PropTypes.func
};

export default Editor;
