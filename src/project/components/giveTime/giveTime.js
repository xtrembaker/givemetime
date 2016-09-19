import React, { PropTypes } from 'react'
import { Dialog, FlatButton, TextField, RaisedButton } from 'material-ui'
import { connect } from 'react-redux'
import * as actions from './giveTime.actions'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

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
                <RaisedButton label="GIVE TIME2" secondary={true}
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
        openId: state.project.giveTime.giveTimeDialog.openId,
        amount: state.project.giveTime.giveTimeDialog.amount,
        userCredit: state.project.login.user.credit,
        userId: state.project.login.user.id,
        userRowId: state.project.login.user.rowId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onSubmit: actions.onSubmit,
        openDialog: actions.openDialog,
        closeDialog: actions.closeDialog }, dispatch)
}

export default reduxForm({
    form: 'giveProjectDialog',
    fields: ['amount', 'projectRowId', 'userRowId'],
})(connect(mapStateToProps, mapDispatchToProps)(GiveTimeDialog))

