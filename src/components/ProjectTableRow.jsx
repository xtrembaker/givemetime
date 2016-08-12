import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionCreditCard from 'material-ui/svg-icons/action/credit-card';
import LinearProgress from 'material-ui/LinearProgress'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import ProjectDialog from './ProjectDialog.jsx'
import GiveTimeDialog from './GiveTimeDialog.jsx'
import { connect } from 'react-redux'
import { getGraphQL, projectDeleted, addProjectDialogToggle } from '../actions.js'


export class ProjectTableRow extends React.Component {
    render () {

        const ownerElements = (this.props.userRowId === this.props.author.rowId) ?
            (
                <span>
                    <IconButton onTouchTap={() => this.props.onDelete.call(this, this.props.id, )}>
                        <ActionDelete />
                    </IconButton>
                    <IconButton onTouchTap={() => {
                        this.props.editProject.call(this, this.props.id, this.props.rowId, this.props.title, this.props.description, this.props.estimate)
                    }}>
                        <EditorModeEdit />
                    </IconButton>
                </span>
            )
            :''


        return (
          <Card onTouchTap={this.handleDiscoverClick} expanded={null} expandable={false} initiallyExpanded={false}>
              <CardHeader title={this.props.title} subtitle={this.props.author.fullname}/>
              <CardText>
                  <span>Q</span>
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
                      rowId={this.props.rowId}
                      description={this.props.description}
                      title={this.props.title}
                      author={this.props.author}
                      estimate={this.props.estimate}
                      acquired={this.props.acquired}
                      initialValues={{
                          amount: 0,
                          projectRowId: this.props.rowId,
                          userRowId: this.props.userRowId,
                      }}
                  />
                  {ownerElements}
              </CardActions>
          </Card>
        )
    }
}

ProjectTableRow.propTypes = {
    id: PropTypes.string.isRequired,
    rowId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.object,
    description: PropTypes.string,
    estimate: PropTypes.number.isRequired,
    acquired: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    userRowId: PropTypes.number.isRequired,

}


const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => {
            dispatch(getGraphQL(`
                mutation deleteProject(
                    $id: ID!
                ) {
                    deleteProject(input: {
                        id: $id
                    }) {
                        id
                    }
                }`,
                { id: id },
                (response) => dispatch(projectDeleted(response.deleteProject.id))
            ))
        },
        editProject: (id, rowId, title, description, estimate) => {
            dispatch(addProjectDialogToggle(
                true,
                id,
                rowId,
                title,
                description,
                estimate
            ))
        }
    }
}

export default connect(null, mapDispatchToProps)(ProjectTableRow)
