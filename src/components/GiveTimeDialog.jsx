import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {giveTime, giveTimeFormChange, openGiveTimeDialog, closeGiveTimeDialog} from '../actions.js';

class GiveTimeDialogComponent extends React.Component {
    isOpen () {
        return this.props.openId === this.props.id
    }

    render() {
        const textFieldWidth = {
            width: "30px"
        };
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
            <FlatButton
                label="GIVE !"
                secondary={true}
                onTouchTap={() => this.props.onSave(this.props.amount, this.props.id)}
            />,
        ];

        let title = 'Give Time to project ' + this.props.title + ' (' + this.props.acquired + '/' + this.props.estimate + ')';
        return (
            <span>
                <RaisedButton label="GIVE TIME" secondary={true} onTouchTap={() => this.props.openDialog(this.props.id)}/>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={false}
                    open={this.isOpen()}
                    onRequestClose={this.props.closeDialog}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <TextField
                            name="amount"
                            style={textFieldWidth}
                            value={this.props.amount}
                            errorText={this.props.errorAmount}
                            onChange={(e) => this.props.onChange(parseInt(e.target.value) || 0, this.props.id)}
                        /> out of {this.props.userCredit} credits.
                    </div>
                </Dialog>
            </span>
        );
    }
}


GiveTimeDialogComponent.propTypes = {
    openId: PropTypes.string,
    amount: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    estimate: PropTypes.number.isRequired,
    userCredit: PropTypes.number.isRequired,
    errorAmount: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    openDialog: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        openId: state.giveTimeDialog.openId,
        amount: state.giveTimeDialog.amount,
        userCredit: state.giveTimeDialog.userCredit,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (amount, projectId, userId) => {
            dispatch(getGraphQL(`
               mutation test(
                  $projectId: ID!,
                  $acquired: Int!,
                  $userId: ID!,
                  $credit: Int!
                ) {
                  updateProject(input: {id: $projectId, acquired: $acquired}) {
                    id
                  }
                  updateUser(input: {id: $userId, credit: $credit}) {
                    id
                  }
                }
              `,
                {
                    "projectId": "UHJvamVjdDo1NzRjNmJmODMyMDc1YjAzMDBjYzY0ZmM",
                    "acquired": 12,
                    "userId": "VXNlcjo1NzRjNzBjMDZmZWU2YTAzMDAxOWU0YjQ",
                    "credit": 12
                },
                (response) => null
            )),
            dispatch(giveTime(amount, projectId))
            dispatch(closeGiveTimeDialog())
        },
        openDialog: (id) => {
            dispatch(openGiveTimeDialog(id))
        },
        closeDialog: () => {
            dispatch(closeGiveTimeDialog())
        },
        onChange: (amount, projectId) => {
            dispatch(giveTimeFormChange(amount, projectId))
        },
    }
};

const GiveTimeDialog = connect(mapStateToProps, mapDispatchToProps)(GiveTimeDialogComponent)


export default GiveTimeDialog;
