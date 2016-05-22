import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress'
import {connect} from 'react-redux';
import {closeProjectDialog} from '../actions.js';

class ViewProjectDialogComponent extends React.Component {
    isOpen () {
        return this.props.openId === this.props.id
    }

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
                open={this.isOpen()}
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
    openId: PropTypes.number,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    estimate: PropTypes.number,
    acquired: PropTypes.number,
    author: PropTypes.string,
    closeDialog: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        openId: state.viewProjectDialog.openId
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        closeDialog: () => {
            dispatch(closeProjectDialog())
        },
    }
};

const ProjectDialog = connect(mapStateToProps, mapDispatchToProps)(ViewProjectDialogComponent)


export default ProjectDialog;
