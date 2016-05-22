import React, { PropTypes } from 'react'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody} from 'material-ui/Table';
import ProjectTableRow from './ProjectTableRow.jsx';
import {connect} from 'react-redux';

class ProjectsTableComponent extends React.Component {
    render() {
        const style = {
          container: {
            textAlign: "center"
          },
          element: {
            textAlign: "left"
          }
        }
        return (
            <div style={style.container}>
                {this.props.projects.map((project, i) =>
                    <ProjectTableRow
                        key={i}
                        id={project.id}
                        style={style.element}
                        title={project.title}
                        author={project.author}
                        description={project.description}
                        estimate={project.estimate}
                        acquired={project.acquired}
                    />
                )}
            </div>
        );
    }
}

ProjectsTableComponent.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        description: PropTypes.string,
        estimate: PropTypes.number.isRequired,
        acquired: PropTypes.number.isRequired
    }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
    return {
        projects: state.projects
    }
};

const ProjectsTable = connect(mapStateToProps)(ProjectsTableComponent)

export default ProjectsTable;
