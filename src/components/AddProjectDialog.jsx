import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';
import {createProject, addProjectDialogToggle, projectFormChange} from '../actions.js';

class AddProjectDialogComponent extends React.Component {

    handleChange = (prop) => {
        return (event) => {
            this.props.onChange(prop, event.target.value);
        };
    };
    handleEstimateChange = (event) => {
        this.props.onChange('estimate', parseInt(event.target.value) || 0);
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
            <FlatButton
                label="Save"
                secondary={true}
                onTouchTap={() => this.props.onCreate(this.props.author, this.props.title, this.props.estimate, this.props.description)}
            />,
        ];

        const style = {
            position: "absolute",
            right: 0,
            margin: 10,
            marginRight: 20,
        };

        const textFieldWidth = {
            width: 500
        };

        return (
            <div>
                <FloatingActionButton style={style} secondary={true} onTouchTap={this.props.openDialog} >
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    title={'Add project' }
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.closeDialog}
                >
                    <div>
                        <TextField onChange={this.handleChange('author')} value={this.props.author} hintText="Author" style={textFieldWidth} disabled={true} value="Eric Raffin"/>
                        <br/>
                        <TextField onChange={this.handleChange('title')} value={this.props.title} hintText="Project Name" style={textFieldWidth}/>
                        <br/>
                        <TextField onChange={this.handleEstimateChange} value={this.props.estimate} hintText="Estimated hours required " style={textFieldWidth}/>
                        <br/>
                        <TextField onChange={this.handleChange('description')} value={this.props.description} hintText="Project's description" multiLine={true} rows={4} style={textFieldWidth}/>
                        <br/>
                    </div>
                </Dialog>
            </div>
        );
    }
}



AddProjectDialogComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    estimate: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        open: state.addProjectDialog.open,
        title: state.addProjectDialog.title,
        estimate: state.addProjectDialog.estimate,
        author: state.addProjectDialog.author,
        description: state.addProjectDialog.description,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (author, title, estimate, description) => {
            dispatch(createProject(author, title, estimate, description))
            dispatch(addProjectDialogToggle(false))
        },
        openDialog: () => {
            dispatch(addProjectDialogToggle(true))
        },
        closeDialog: () => {
            dispatch(addProjectDialogToggle(false))
        },
        onChange: (prop, value) => {
            dispatch(projectFormChange(prop, value))
        },
    }
};

const AddProjectDialog = connect(mapStateToProps, mapDispatchToProps)(AddProjectDialogComponent)


export default AddProjectDialog;
