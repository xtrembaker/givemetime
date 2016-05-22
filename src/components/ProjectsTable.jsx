import React, { PropTypes } from 'react'
import {Table, TableHeaderColumn, TableRow, TableHeader, TableBody} from 'material-ui/Table';
import ProjectTableRow from './ProjectTableRow.jsx';
import {connect} from 'react-redux';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class ProjectsTableComponent extends React.Component {
    render() {
        const layout = this.props.projects.map((project, i) => {
            return {
                i: ''+i,
                x: i % 3,
                y: Math.floor(i / 3),
                w: 1,
                h: 1,
                static: true
            }
        })

        return (
            <ResponsiveReactGridLayout
                className="layout"
                layouts={{lg: layout, md: layout, sm: layout}}
                breakpoints={{lg: 1200, md: 480, sm: 0}}
                cols={{lg: 3, md: 2, sm: 1}}
                rowHeight={170}
                autoSize={true}
              >
                {this.props.projects.map((project, i) =>
                    <div key={i}>
                        <ProjectTableRow
                            id={project.id}
                            title={project.title}
                            author={project.author}
                            description={project.description}
                            estimate={project.estimate}
                            acquired={project.acquired}
                        />
                    </div>
                )}
            </ResponsiveReactGridLayout>
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
