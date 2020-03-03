import React, { Component, Fragment } from "react";

class UserEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {editor: "",};
        this.textEditor = React.createRef();
    }

    handleEditorChange = (event) => {
        this.setState({editor: event.target.value});
        this.sendToParent(event.target.value);
    }

    sendToParent = (value) => {
        // eslint-disable-next-line react/prop-types
        this.props.parentCallback(value);
    }
    
    componentDidMount() {
        this.textEditor.current.focus();
    }

    render() {
        const {editor} = this.state;

        return(
            <Fragment>
				<textarea 
					className = "col-12"
                    ref={this.textEditor}
                    value={editor}
                    onChange={this.handleEditorChange}>
                </textarea>  
            </Fragment>
        );
    }
}

export default UserEditor;
