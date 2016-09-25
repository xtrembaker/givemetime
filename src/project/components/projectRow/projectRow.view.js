import React, { PropTypes } from 'react'
import { IconButton, LinearProgress } from 'material-ui'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import ProjectPropTypes from '../../project.propTypes'
import { Link } from 'react-router'

export function ProjectRowComponent ({ project: { id, title, estimate, author, acquired }, onDelete }) {
    return (
      <Card expanded={null} expandable={false} initiallyExpanded={false}>
          <CardHeader title={title} subtitle={author}/>
          <CardText>
              <div>Estimated time : {estimate}</div>
              <LinearProgress max={estimate} min={0} value={acquired} mode="determinate"/>
          </CardText>
          <CardActions>
              <Link to={`/view/${id}`}>View</Link>
              <Link to={`/give/${id}`}>Give Time</Link>
              <IconButton onTouchTap={() => onDelete(id)}>
                  <ActionDelete />
              </IconButton>
          </CardActions>
      </Card>
    )
}

ProjectRowComponent.propTypes = {
    project: ProjectPropTypes,
    onDelete: PropTypes.func.isRequired,
}