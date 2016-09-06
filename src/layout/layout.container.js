import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import ProjectsTable from '../project/project.container'
import AddProjectDialog from '../project/components/addProject/addProject.js'
import LoginButton from '../login/login.container'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { connect } from 'react-redux'
import * as actions from './Layout.actions'
import { bindActionCreators } from 'redux'
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
                        <AddProjectDialog initialValues={{ author: this.props.user.rowId }} />
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
                        />
                        <MenuItem onTouchTap={this.handleClose}>Projects</MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>Add project</MenuItem>
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
}


const mapStateToProps = (state) => {
    console.log("state : %j", state);
    return {
        user: state.project.login.user,
        globalMenuOpen: state.project.layout.globalMenuOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        globalMenuToggle: actions.globalMenuToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
