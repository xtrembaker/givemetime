import React, { PropTypes } from 'react'
import ProjectTableRow from './ProjectTableRow.jsx';
import { connect } from 'react-apollo';
import gql from 'apollo-client/gql';
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
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string,
        description: PropTypes.string,
        estimate: PropTypes.number.isRequired,
        acquired: PropTypes.number.isRequired
    }).isRequired).isRequired,
};



const mapQueriesToProps = ({ ownProps, state }) => {
    return {
        projects: {
            query: gql`
               query {
                 viewer {
                   allProjects {
                     edges {
                       node {
                         id,
                         title,
                         estimate,
                         acquired,
                         description,
                         author {
                           fullname
                         }
                       }
                     }
                   }
                 }
               }
          `,
        },
    };
}

class ProjectsTableComponentWithData extends React.Component {
    render() {
        if (this.props.projects.loading) {
            return (<div>Data is loading</div>)
        } else if (this.props.projects.errors) {
            throw this.props.projects.errors;
        } else {
            return (<ProjectsTableComponent {...{
                projects: this.props.projects.viewer.allProjects.edges.map((edge) => {
                    return edge.node;
                })
            }}/>)
        }
    }
}

const ProjectsTable = connect({ mapQueriesToProps })(ProjectsTableComponentWithData)

export default ProjectsTable;
