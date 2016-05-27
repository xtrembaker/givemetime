import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { connect } from 'react-apollo';
import gql from 'apollo-client/gql';
import {projectCreated, addProjectDialogToggle, projectFormChange} from '../actions.js';

class AddProjectDialogComponent extends React.Component {

    handleChange = (prop) => {
        return (event) => {
            this.props.onChange(prop, event.target.value);
        };
    };
    handleEstimateChange = (event) => {
        this.props.onChange('estimate', parseInt(event.target.value) || 0);
    };

    handleSave = () => {
        this.props.closeDialog();
        this.props.mutations.createProject(this.props.author, this.props.title, this.props.estimate, this.props.description)
            .then(() => this.props.closeDialog())
            .then(() => this.props.projectCreated(this.props.createProject.createProject))
            .catch(() => this.props.openDialog())
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
                onTouchTap={this.handleSave}
            />,
        ];

        const style = {
            position: "fixed",
            right: 0,
            bottom: 0,
            margin: 10,
            marginRight: 20,
        };

        const textFieldWidth = {
            width: "100%"
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
                    autoScrollBodyContent={true}
                >
                    <div>
                        <TextField onChange={this.handleChange('author')} value={this.props.author} floatingLabelText="Author" style={textFieldWidth} disabled={true} value="Eric Raffin"/>
                        <br/>
                        <TextField onChange={this.handleChange('title')} value={this.props.title} floatingLabelText="Project Name" style={textFieldWidth}/>
                        <br/>
                        <TextField onChange={this.handleEstimateChange} value={this.props.estimate} floatingLabelText="Estimated hours required " style={textFieldWidth}/>
                        <br/>
                        <TextField onChange={this.handleChange('description')} value={this.props.description} floatingLabelText="Project's description" multiLine={true} rows={4} style={textFieldWidth}/>
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
    estimate: PropTypes.number,
    author: PropTypes.string.isRequired,
    mutations: PropTypes.shape({
        createProject: PropTypes.func.isRequired,
    }).isRequired,
    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        open: state.global.addProjectDialog.open,
        title: state.global.addProjectDialog.title,
        estimate: state.global.addProjectDialog.estimate,
        author: state.global.addProjectDialog.author,
        description: state.global.addProjectDialog.description,
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        projectCreated: (project) => {
            dispatch(projectCreated(
                project.id,
                project.changedProject.acquired,
                project.changedProject.estimate,
                project.changedProject.title,
                project.changedProject.description
            ))
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

function mapMutationsToProps({ ownProps, state }) {
    return {
        createProject: (author, title, estimate, description) => ({
            mutation: gql`
                mutation createProject(
                      $title: String!,
                      $estimate: Int!,
                      $acquired: Int!,
                      $description: String
                  ){
                  createProject(input: {
                      title: $title,
                      estimate: $estimate,
                      acquired: $acquired,
                      description: $description
                  }) {
                      id,
                      changedProject {
                          title,
                          estimate,
                          acquired,
                          description 
                      }
                  }
                }
            `,
            variables: {
                title: title,
                estimate: estimate,
                description: description,
                acquired: 0
            },
        }),
    };
};

const AddProjectDialog = connect({
    mapStateToProps,
    mapDispatchToProps,
    mapMutationsToProps
})(AddProjectDialogComponent)



export default AddProjectDialog;
