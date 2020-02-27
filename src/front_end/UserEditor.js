import React, { Component } from "react";

class UserEditor extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editor: "",
        };
    }

    handleEditorChange = (event) => {
        this.setState({
            editor: event.target.value
        });

        this.sendToParent(event.target.value); 
    }

    sendToParent = (value) => {
        this.props.parentCallback(value);
    }
    
    render() {
        const {editor} = this.state;

        return(
            <React.Fragment>
                <textarea 
                    value={editor}
                    onChange={this.handleEditorChange}>
                </textarea>  
            </React.Fragment>
        ); 
    }
}

export default UserEditor;
