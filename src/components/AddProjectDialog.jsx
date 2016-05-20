import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const textFieldWidth = {
    width: 500
};

export default class AddProjectDialog extends React.Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () => {
        alert('TODO : save project');
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

        const style = {
            position: "absolute",
            right: 0,
            margin: 10,
            marginRight: 20,
        };

        return (
            <div>
                <FloatingActionButton style={style} secondary={true} onTouchTap={this.handleOpen} >
                    <ContentAdd />
                </FloatingActionButton>
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
            </div>
        );
    }
}