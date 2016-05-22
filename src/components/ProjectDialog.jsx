import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress'
import {connect} from 'react-redux';
import {viewProjectDialogToggle} from '../actions.js';

class ViewProjectDialogComponent extends React.Component {
    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
        ];

        return (
            <Dialog
                title={this.props.title + ' by ' + this.props.author  }
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.closeDialog}
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

ViewProjectDialogComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    estimate: PropTypes.number,
    acquired: PropTypes.number,
    author: PropTypes.string,
    closeDialog: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        open: state.viewProjectDialog.open
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        closeDialog: () => {
            dispatch(viewProjectDialogToggle(false))
        },
    }
};

const ProjectDialog = connect(mapStateToProps, mapDispatchToProps)(ViewProjectDialogComponent)


export default ProjectDialog;
