import React from 'react';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress'
import RaisedButton from 'material-ui/FlatButton';
import ProjectDialog from './ProjectDialog.jsx';


export default class ProjectTableRow extends React.Component {
    handleDiscoverClick = () => this.refs.ProjectDialog.setState({open: true});

    constructor(){
        super();
    }


    render(){
        return <TableRow>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                {this.props.title}
            </TableRowColumn>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                {this.props.author}
            </TableRowColumn>
            <TableRowColumn onTouchTap={this.handleDiscoverClick}>
                <LinearProgress max={this.props.estimate} min={0} value={this.props.acquired} mode="determinate"/>
            </TableRowColumn>
            <TableRowColumn>
                <RaisedButton label="Discover" primary={true}  onTouchTap={this.handleDiscoverClick}/>
                <RaisedButton label="GIVE TIME" secondary={true} />
                <ProjectDialog
                    ref="ProjectDialog"
                    description="Lorem ipsum"
                    title={this.props.title}
                    author={this.props.author}
                    estimate={this.props.estimate}
                    acquired={this.props.acquired} />
            </TableRowColumn>
        </TableRow>
    }
}
