import React from 'react'
import ProjectTableRow from './components/projectResultsRow/projectResultsRow.js'
import { connect } from 'react-redux'
import * as actions from './project.actions'
import { bindActionCreators } from 'redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import PropTypes from 'prop-types'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export class ProjectsTable extends React.Component {

    componentDidMount () {
        this.props.loadProjects()
    }
    render () {
        const layout = this.props.projects.map((project, i) => {
            return {
                i: '' + i,
                x: i % 3,
                y: Math.floor(i / 3),
                w: 1,
                h: 1,
                static: true,
            }
        })
        return (
            <ResponsiveReactGridLayout
                className="layout"
                layouts={{ lg: layout, md: layout, sm: layout }}
                breakpoints={{ lg: 1200, md: 480, sm: 0 }}
                cols={{ lg: 3, md: 2, sm: 1 }}
                rowHeight={170}
                autoSize={true}
              >
                 {this.props.projects.map((project, i) =>
                    <div key={i}>
                        <ProjectTableRow
                            id={project.id}
                            rowId={project.rowId}
                            title={project.title}
                            author={project.author}
                            description={project.description}
                            estimate={project.estimate}
                            acquired={project.acquired}
                            userRowId={this.props.userRowId}
                        />
                    </div>
                )}
            </ResponsiveReactGridLayout>
        )
    }
}

ProjectsTable.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string,
        description: PropTypes.string,
        estimate: PropTypes.number.isRequired,
        acquired: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    loadProjects: PropTypes.func.isRequired,
    userRowId: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
    return {
        projects: state.project.project.projects,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loadProjects: actions.loadProjects }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsTable)
