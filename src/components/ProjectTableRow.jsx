import React, { PropTypes } from 'react'

import {TableRow, TableRowColumn} from 'material-ui/Table';
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import ProjectDialog from './ProjectDialog.jsx';
import GiveTimeDialog from './GiveTimeDialog.jsx';
import {connect} from 'react-redux';


class ProjectTableRowComponent extends React.Component {
    render () {
        const style = {
            container: {
                width: "32%",
                display: "inline-block",
                margin: "3px"
            },
            actions: {
                textAlign: "right"
            }
        };
        return (
          <Card style={Object.assign({}, this.props.style, style.container)} onTouchTap={this.handleDiscoverClick} expanded={null} expandable={false} initiallyExpanded={false}>
              <CardHeader title={this.props.title} subtitle={this.props.author}/>
              <CardText>
                  <div>Estimated time : {this.props.estimate}</div>
                  <LinearProgress max={this.props.estimate} min={0} value={this.props.acquired} mode="determinate"/>
              </CardText>
              <CardActions style={style.actions}>
                  <ProjectDialog
                      ref="ProjectDialog"
                      id={this.props.id}
                      description={this.props.description}
                      title={this.props.title}
                      author={this.props.author}
                      estimate={this.props.estimate}
                      acquired={this.props.acquired} />
                  <GiveTimeDialog
                      id={this.props.id}
                      description={this.props.description}
                      title={this.props.title}
                      author={this.props.author}
                      estimate={this.props.estimate}
                      acquired={this.props.acquired} />
              </CardActions>
          </Card>
        )
    }
}

ProjectTableRowComponent.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
    estimate: PropTypes.number.isRequired,
    acquired: PropTypes.number.isRequired,
    style: PropTypes.object
};

const ProjectTableRow = connect()(ProjectTableRowComponent)


export default ProjectTableRow;
