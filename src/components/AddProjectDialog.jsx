import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { connect } from 'react-redux'
import { getGraphQL, projectCreated, addProjectDialogToggle } from '../actions.js'
import { reduxForm } from 'redux-form'

export class AddProjectDialog extends React.Component {

    render () {

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

        const { fields: { title, estimate, description }, handleSubmit } = this.props

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
            <FlatButton
                label="Save"
                secondary={true}
                onTouchTap={handleSubmit(this.props.onSubmit)}
            />,
        ]

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
                    <form onSubmit={handleSubmit(this.props.onSubmit)}>
                        <TextField floatingLabelText="Author" style={textFieldWidth} disabled={true} value={this.props.userFullName} />
                        <br/>
                        <TextField floatingLabelText="Project Name" style={textFieldWidth} {...title}/>
                        <br/>
                        <TextField floatingLabelText="Estimated hours required " style={textFieldWidth} {...estimate}/>
                        <br/>
                        <TextField floatingLabelText="Project's description" multiLine={true} rows={4} style={textFieldWidth} {...description}/>
                    </form>
                </Dialog>
            </div>
        )
    }
}


AddProjectDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    userRowId: PropTypes.number.isRequired,
    userFullName: PropTypes.string.isRequired,
    fields: PropTypes.shape({
        author: PropTypes.object.isRequired,
        title: PropTypes.object.isRequired,
        estimate: PropTypes.object.isRequired,
        description: PropTypes.object.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        open: state.project.addProjectDialog.open,
        userRowId: state.project.user.rowId,
        userFullName: state.project.user.fullname,
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
        onSubmit: (form) => {
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
                    title: form.title,
                    estimate: form.estimate,
                    description: form.description,
                    acquired: 0,
                    authorId: form.author,
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

export default reduxForm({
    form: 'addProjectDialog',
    fields: ['author', 'title', 'estimate', 'description'],
})(connect(mapStateToProps, mapDispatchToProps)(AddProjectDialog))
