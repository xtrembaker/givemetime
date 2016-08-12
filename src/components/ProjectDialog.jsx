import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/FlatButton'
import LinearProgress from 'material-ui/LinearProgress'
import { connect } from 'react-redux'
import { closeProjectDialog, openProjectDialog } from '../actions.js'

export class ViewProjectDialog extends React.Component {
    isOpen () {
        return this.props.openId === this.props.id
    }

    render () {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.props.closeDialog}
            />,
        ]

        return (
            <span>
                <RaisedButton label="Discover" primary={true} onTouchTap={() => this.props.onTap(this.props.id)}/>
                <Dialog
                    title={this.props.title + ' by ' + this.props.author.fullname}
                    actions={actions}
                    modal={false}
                    open={this.isOpen()}
                    onRequestClose={this.props.closeDialog}
                    autoScrollBodyContent={true}
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
            </span>
        )
    }
}

ViewProjectDialog.propTypes = {
    openId: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    estimate: PropTypes.number,
    acquired: PropTypes.number,
    author: PropTypes.object.isRequired,
    closeDialog: PropTypes.func.isRequired,
    onTap: PropTypes.func.isRequired,
    description: PropTypes.string,
}


const mapStateToProps = (state) => {
    return {
        openId: state.project.viewProjectDialog.openId,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        closeDialog: () => {
            dispatch(closeProjectDialog())
        },
        onTap: (id) => {
            dispatch(openProjectDialog(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjectDialog)
