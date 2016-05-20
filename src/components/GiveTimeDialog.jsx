import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const textFieldWidth = {
    width: 200
};

class GiveTimeDialog extends React.Component {
    state = {
        open: false,
        amount: 10
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave(){
        if(this.amountValidator(this.state.amount)) {
            this.props.dispatch({
                type:'GIVE_TIME',
                author:this.state.author,
                projectId:this.props.projectId,
                amount:this.state.amount
            });
            this.handleClose()
        }
    }

    handleChange(e){
        if(e.target.name == 'amount') {
            this.amountValidator(e.target.value);
        }

        var name = {};
        name[e.target.name] = e.target.value;
        this.setState(name);
    }

    amountValidator(value) {
        if(isNaN(value)) {
            this.state.errorAmount = 'Looks like a number ?';
            return false;
        } else {
            console.log('proper validation');
            return true;
            if(value > this.state.user.credit) {
                this.state.errorAmount = 'Ahahaha';
                return false;
            }
            this.state.errorAmount = null;
            return true;
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="GIVE !"
                secondary={true}
                onTouchTap={this.handleSave.bind(this)}
            />,
        ];

        let title = 'Give Time to project ' + this.props.projectTitle;
        return (
            <span>
                <RaisedButton label="GIVE TIME" secondary={true} onTouchTap={this.handleOpen}/>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
                        <TextField
                            name="amount"
                            hintText=""
                            style={textFieldWidth}
                            value={this.state.amount}
                            errorText={this.state.errorAmount}
                            onChange={this.handleChange.bind(this)}
                        /> out of this.props.user.credit
                    </div>
                </Dialog>
            </span>
        );
    }
}

export default connect()(GiveTimeDialog);
