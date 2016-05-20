import React from 'react';
import {connect} from 'react-redux';
import Dialog from 'material-ui/dialog';
import FlatButton from 'material-ui/flat-button';
import TextField from 'material-ui/text-field';

const textFieldWidth = {
    width: 200
};

class GiveTimeDialog extends React.Component {
    constructor(props) {
        super(props);
        //this.props = {open:false};
        this.state = {};
    }

    display(val) {
        this.props.open = val;
    }


    handleSave(){
        if(this.amountValidator(this.state.amount)) {
            //console.log('dispatch to proj '+this.props.projectId+ ' from user '+this.state.author+' for amount '+this.state.amount);
            this.props.dispatch({
                type:'GIVE_TIME',
                author:this.state.author,
                projectId:this.props.projectId,
                amount:this.state.amount
            });
            this.props.display(false);
            this.state = {author:this.props.user.name};
        }

        this.props.display(false);
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
            if(value > this.props.user.credit) {
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
                onTouchTap={() => this.props.display(false)}
            />,
            <FlatButton
                label="GIVE !"
                secondary={true}
                onTouchTap={this.handleSave.bind(this)}
            />,
        ];

        let title = 'Give Time to project ' + this.props.projectTitle;
        return (
            <Dialog
                title={title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={() => this.display(false) }
            >
                <div>
                    <TextField
                        name="amount"
                        hintText=""
                        style={textFieldWidth}
                        value={this.state.amount}
                        errorText={this.state.errorAmount}
                        onChange={this.handleChange.bind(this)}
                    /> out of {this.props.user.credit}
                </div>
            </Dialog>
        );
    }
}

export default connect()(GiveTimeDialog);
