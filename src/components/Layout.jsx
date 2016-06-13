import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import Navigation from './Navigation.jsx'
import ProjectsTable from './ProjectsTable.jsx'
import AddProjectDialog from './AddProjectDialog.jsx'
import LoginButton from './LoginButton.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux'

// Use named export for unconnected component (for tests)
export class Layout extends React.Component {
    handleMenuClick () {
        this.refs.ProjectLeftNav.setState({ open: true })
    }

    render () {
        if (this.props.user.id) {
            return (
                <div>
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <AppBar
                            title="Give R&D time"
                            onLeftIconButtonTouchTap={this.handleMenuClick}
                            isInitiallyOpen={true}
                            iconElementRight={<LoginButton />}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <Navigation ref="ProjectLeftNav" open="false"/>
                    </MuiThemeProvider>

                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <ProjectsTable userRowId={this.props.user.rowId}/>
                    </MuiThemeProvider>

                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <AddProjectDialog initialValues={{ author: this.props.user.rowId }} />
                    </MuiThemeProvider>
                </div>
            )
        } else {
            return (
                <div>
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <AppBar
                            title="Give R&D time"
                            onLeftIconButtonTouchTap={this.handleMenuClick}
                            isInitiallyOpen={true}
                            iconElementRight={<LoginButton />}
                        />
                    </MuiThemeProvider>
                    Login to view projects
                </div>
            )
        }
    }
}

Layout.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        rowId: PropTypes.number,
    }).isRequired,
}


const mapStateToProps = (state) => {
    return {
        user: state.project.user,
    }
}

export default connect(mapStateToProps)(Layout)
