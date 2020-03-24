import React, {Component, Fragment } from "react";
import PropTypes from "prop-types";
import "../css/Editor.css";

class DisplayEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {editor: ""};
		this.textEditor = React.createRef();
	}

handleEditorChange = (event) => {
	this.setState({editor: event.target.value});
	this.props.editorUpdate(event.target.value);
}

componentDidMount() {
	this.textEditor.current.focus();
}

render() {
	const {editor} = this.state;

	return(
		<Fragment>
			<textarea 
				className = "col-12 editor"
				ref={this.textEditor}
				value={editor}
				onChange={this.handleEditorChange}>
			</textarea>  
		</Fragment>
	);
}
}

DisplayEditor.propTypes = {
	editorUpdate : PropTypes.func
};

export default DisplayEditor;
