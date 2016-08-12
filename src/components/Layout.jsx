import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import ProjectsTable from './ProjectsTable.jsx'
import AddEditProjectDialog from './AddEditProjectDialog.jsx'
import LoginButton from './LoginButton.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux'
import { globalMenuToggle, addProjectDialogToggle } from '../actions.js'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

// Use named export for unconnected component (for tests)
export class Layout extends React.Component {
    handleMenuClick () {
        this.props.globalMenuToggle(this.props.globalMenuOpen)
    }

    render () {
        const content = this.props.user.id
            ? (
                <div>
                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <ProjectsTable userRowId={this.props.user.rowId}/>
                    </MuiThemeProvider>

                    <MuiThemeProvider muiTheme={getMuiTheme()}>
                        <AddEditProjectDialog initialValues={{ author: this.props.user.rowId }} />
                    </MuiThemeProvider>
                </div>
            )
            : (
                <div>Login to view projects</div>
            )

        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <AppBar
                        title="Give R&D time"
                        onLeftIconButtonTouchTap={() => this.handleMenuClick()}
                        isInitiallyOpen={true}
                        iconElementRight={<LoginButton />}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <Drawer
                        docked={false}
                        width={300}
                        open={this.props.globalMenuOpen}
                        onRequestChange={() => this.handleMenuClick()}
                    >
                        <AppBar
                            title="Give R&D time"
                            onLeftIconButtonTouchTap={() => this.handleMenuClick()}
                            isInitiallyOpen={true}
                        />
                        <MenuItem onTouchTap={this.props.showNewProjectDialog}>Add project</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>My account</MenuItem>
                    </Drawer>
                </MuiThemeProvider>
                { content }
            </div>
        )
    }
}

Layout.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        rowId: PropTypes.number,
    }).isRequired,
    globalMenuOpen: PropTypes.bool.isRequired,
    globalMenuToggle: PropTypes.func.isRequired,
    showNewProjectDialog: PropTypes.func.isRequired,
}


const mapStateToProps = (state) => {
    return {
        user: state.project.user,
        globalMenuOpen: state.project.globalMenuOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        globalMenuToggle: (currentState) => {
            dispatch(globalMenuToggle(!currentState))
        },
        showNewProjectDialog: () => {
            dispatch(addProjectDialogToggle(true))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
