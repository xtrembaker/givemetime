import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import LinearProgress from 'material-ui/LinearProgress'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ProjectDialog from './ProjectDialog.jsx';
import GiveTimeDialog from './GiveTimeDialog.jsx';
import { connect } from 'react-apollo';
import gql from 'apollo-client/gql';


class ProjectTableRowComponent extends React.Component {
    render () {
        return (
          <Card onTouchTap={this.handleDiscoverClick} expanded={null} expandable={false} initiallyExpanded={false}>
              <CardHeader title={this.props.title} subtitle={this.props.author}/>
              <CardText>
                  <div>Estimated time : {this.props.estimate}</div>
                  <LinearProgress max={this.props.estimate} min={0} value={this.props.acquired} mode="determinate"/>
              </CardText>
              <CardActions>
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
                  <IconButton onTouchTap={() => this.props.mutations.deleteProject(this.props.id)}>
                      <ActionDelete />
                  </IconButton>
              </CardActions>
          </Card>
        )
    }
}

ProjectTableRowComponent.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    description: PropTypes.string,
    estimate: PropTypes.number.isRequired,
    acquired: PropTypes.number.isRequired,
};


function mapMutationsToProps({ ownProps, state }) {
    return {
        deleteProject: (id) => ({
            mutation: gql`
                mutation deleteProject(
                  $id: ID!
                ) {
                    deleteProject(input: {
                        id: $id
                    }) {
                        id
                    }
                }
            `,
            variables: {
                id: id
            },
        }),
    };
};

const ProjectTableRow = connect({mapMutationsToProps})(ProjectTableRowComponent)


export default ProjectTableRow;
