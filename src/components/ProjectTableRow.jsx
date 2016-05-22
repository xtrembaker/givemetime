import React, { PropTypes } from 'react'

import {TableRow, TableRowColumn} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/FlatButton';
import ProjectDialog from './ProjectDialog.jsx';
import GiveTimeDialog from './GiveTimeDialog.jsx';
import {connect} from 'react-redux';
import {viewProjectDialogToggle} from '../actions.js';


class ProjectTableRowComponent extends React.Component {
    render(){
        return <TableRow>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                {this.props.title}
            </TableRowColumn>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                {this.props.author}
            </TableRowColumn>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                {this.props.description}
            </TableRowColumn>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                <LinearProgress max={this.props.estimate} min={0} value={this.props.acquired} mode="determinate"/>
            </TableRowColumn>
            <TableRowColumn>
                <RaisedButton label="Discover" primary={true}  onTouchTap={this.props.onTap}/>
                <GiveTimeDialog />
                <ProjectDialog
                    ref="ProjectDialog"
                    description={this.props.description}
                    title={this.props.title}
                    author={this.props.author}
                    estimate={this.props.estimate}
                    acquired={this.props.acquired} />
            </TableRowColumn>
        </TableRow>
    }
}

ProjectTableRowComponent.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    estimate: PropTypes.number.isRequired,
    acquired: PropTypes.number.isRequired,
    onTap: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTap: () => {
            dispatch(viewProjectDialogToggle(true))
        },
    }
};

const ProjectTableRow = connect(null, mapDispatchToProps)(ProjectTableRowComponent)


export default ProjectTableRow;
