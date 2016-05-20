import React, { PropTypes } from 'react'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody} from 'material-ui/Table';
import ProjectTableRow from './ProjectTableRow.jsx';
import {connect} from 'react-redux';


class ProjectsTableComponent extends React.Component {
    render(){
        return (
            <Table>
                <TableHeader displaySelectAll={false} menableSelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Author</TableHeaderColumn>
                        <TableHeaderColumn>Time</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.projects.map(project =>
                        <ProjectTableRow
                            id={project.id}
                            title={project.title}
                            author={project.author}
                            description={project.description}
                            estimate={project.estimate}
                            acquired={project.acquired}
                        />
                    )}
                </TableBody>
            </Table>
        );
    }
}

ProjectsTableComponent.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
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

