import React from 'react';
import Dialog from 'material-ui/dialog';
import FlatButton from 'material-ui/flat-button';
import TextField from 'material-ui/text-field';

const textFieldWidth = {
    width: 500
};

export default class AddProjectDialog extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleSave = () => {
        alert('TODO : save project');
        this.setState({open: false});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Save"
                secondary={true}
                onTouchTap={this.handleSave}
            />,
        ];

        return (
            <Dialog
                title={'Add project' }
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div>
                    <TextField hintText="Author" style={textFieldWidth} disabled={true} value="Eric Raffin"/>
                    <br/>
                    <TextField hintText="Project Name" style={textFieldWidth}/>
                    <br/>
                    <TextField hintText="Estimated hours required " style={textFieldWidth}/>
                    <br/>
                    <TextField hintText="Project's description" multiLine={true} rows={4} style={textFieldWidth}/>
                    <br/>
                </div>
            </Dialog>
        );
    }
}