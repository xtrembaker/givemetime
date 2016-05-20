import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress'

export default class ProjectDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <Dialog
                title={this.props.title + ' by ' + this.props.author  }
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                <div>
                    Time required : {this.props.acquired}/{this.props.estimate}
                    <br/>
                    <LinearProgress max={this.props.estimate} min={0} value={this.props.acquired} mode="determinate"/>
                </div>
                <p>
                    Description : {this.props.description}
                </p>
            </Dialog>
        );
    }
}