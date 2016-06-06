import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import { getGraphQL, projectCreated, addProjectDialogToggle, projectFormChange } from '../actions.js'

export class AddProjectDialog extends React.Component {

    handleChange (prop) {
        return (event) => this.props.onChange(prop, event.target.value)
    }
    handleEstimateChange (event) {
        this.props.onChange('estimate', parseInt(event.target.value) || 0)
    }

    render () {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
            <FlatButton
                label="Save"
                secondary={true}
                onTouchTap={() => this.props.onSave.call(this, this.props.userRowId, this.props.title, this.props.estimate, this.props.description)}
            />,
        ]

        const style = {
            position: 'fixed',
            right: 0,
            bottom: 0,
            margin: 10,
            marginRight: 20,
        }

        const textFieldWidth = {
            width: '100%',
        }

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
                        <TextField onChange={this.handleChange('author')} value={this.props.author} floatingLabelText="Author" style={textFieldWidth} disabled={true} />
                        <br/>
                        <TextField onChange={this.handleChange('title')} value={this.props.title} floatingLabelText="Project Name" style={textFieldWidth}/>
                        <br/>
                        <TextField onChange={this.handleEstimateChange.bind(this)} value={this.props.estimate} floatingLabelText="Estimated hours required " style={textFieldWidth}/>
                        <br/>
                        <TextField onChange={this.handleChange('description')} value={this.props.description} floatingLabelText="Project's description" multiLine={true} rows={4} style={textFieldWidth}/>
                        <br/>
                    </div>
                </Dialog>
            </div>
        )
    }
}


AddProjectDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    estimate: PropTypes.number,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    userRowId: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
    return {
        open: state.addProjectDialog.open,
        title: state.addProjectDialog.title,
        estimate: state.addProjectDialog.estimate,
        author: state.user.fullname,
        description: state.addProjectDialog.description,
        userRowId: state.user.rowId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openDialog: () => {
            dispatch(addProjectDialogToggle(true))
        },
        closeDialog: () => {
            dispatch(addProjectDialogToggle(false))
        },
        onChange: (prop, value) => {
            dispatch(projectFormChange(prop, value))
        },
        onSave: (authorId, title, estimate, description) => {
            dispatch(getGraphQL(`
                mutation createProject(
                    $title: String!,
                    $estimate: Int!,
                    $acquired: Int!,
                    $description: String,
                    $authorId: Int!
                ){
                    insertProject(input: {
                        title: $title,
                        estimate: $estimate,
                        acquired: $acquired,
                        description: $description,
                        authorId: $authorId
                    }) {
                        project {
                            id,
                            rowId,
                            title,
                            estimate,
                            acquired,
                            description,
                            personByAuthorId {
                                id,
                                fullname,
                                credit
                            }
                        }
                    }
                }`,
                {
                    title: title,
                    estimate: estimate,
                    description: description,
                    acquired: 0,
                    authorId: authorId,
                },
                (response) => {
                    dispatch(projectCreated(
                        response.insertProject.project.id,
                        response.insertProject.project.rowId,
                        response.insertProject.project.title,
                        response.insertProject.project.estimate,
                        response.insertProject.project.acquired,
                        response.insertProject.project.description,
                        response.insertProject.project.personByAuthorId.fullname
                    ))
                    dispatch(addProjectDialogToggle(false))
                }
            ))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectDialog)
