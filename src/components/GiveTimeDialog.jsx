import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { giveTime, openGiveTimeDialog, getGraphQL, closeGiveTimeDialog } from '../actions.js'
import { reduxForm } from 'redux-form'

export class GiveTimeDialog extends React.Component {
    isOpen () {
        return this.props.openId === this.props.id
    }

    render () {
        const textFieldWidth = {
            width: '30px',
        }

        const { fields: { amount }, handleSubmit } = this.props

        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
            <FlatButton
                label="GIVE !"
                secondary={true}
                onTouchTap={handleSubmit(this.props.onSubmit)}
            />,
        ]

        const title = 'Give Time to project ' + this.props.title + ' (' + this.props.acquired + '/' + this.props.estimate + ')'

        return (
            <span>
                <RaisedButton label="GIVE TIME" secondary={true}
                              onTouchTap={() => this.props.openDialog(this.props.id)}/>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={false}
                    open={this.isOpen()}
                    onRequestClose={this.props.closeDialog}
                    autoScrollBodyContent={true}
                >
                    <form onSubmit={handleSubmit(this.props.onSubmit)}>
                        <TextField
                            name="amount"
                            style={textFieldWidth}
                            {...amount}
                        /> out of {this.props.userCredit} credits.
                    </form>
                </Dialog>
            </span>
        )
    }
}


GiveTimeDialog.propTypes = {
    openId: PropTypes.string,
    id: PropTypes.string.isRequired,
    rowId: PropTypes.number.isRequired,
    userRowId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    fields: PropTypes.shape({
        amount: PropTypes.object.isRequired,
    }).isRequired,
    estimate: PropTypes.number.isRequired,
    acquired: PropTypes.number.isRequired,
    userCredit: PropTypes.number.isRequired,
    errorAmount: PropTypes.string,
    closeDialog: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        openId: state.project.giveTimeDialog.openId,
        amount: state.project.giveTimeDialog.amount,
        userCredit: state.project.giveTimeDialog.userCredit,
        userId: state.project.user.id,
        userRowId: state.project.user.rowId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (form) => {
            dispatch(getGraphQL(`
                mutation giveTime(
                    $projectRowId: Int!,
                    $userRowId: Int!,
                    $credit: Int!
                ){
                    projectGiveTime(input: {
                        personId: $userRowId,
                        projectId: $projectRowId,
                        amount: $credit
                    }) {
                        output {
                            rowId,
                            acquired
                        }
                    }
                }`,
                {
                    credit: form.amount,
                    userRowId: form.userRowId,
                    projectRowId: form.projectRowId,
                },
                () => {
                    dispatch(giveTime(form.amount, form.projectRowId))
                    dispatch(closeGiveTimeDialog())
                }
            ))
        },
        openDialog: (id) => {
            dispatch(openGiveTimeDialog(id))
        },
        closeDialog: () => {
            dispatch(closeGiveTimeDialog())
        },
    }
}

export default reduxForm({
    form: 'giveProjectDialog',
    fields: ['amount', 'projectRowId', 'userRowId'],
})(connect(mapStateToProps, mapDispatchToProps)(GiveTimeDialog))

