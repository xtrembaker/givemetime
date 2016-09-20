import React, { PropTypes } from 'react'
import { AppBar, MenuItem, Drawer } from 'material-ui'
import ProjectsTable from '../project/project.container'
import AddProjectDialog from '../project/components/addProject/addProject.js'
import LoginButton from '../login/login.container'
import { connect } from 'react-redux'
import * as actions from './Layout.actions'
import * as actionsDialog from '../project/components/addProject/addProject.actions.js'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

// Use named export for unconnected component (for tests)
export class Layout extends React.Component {
    handleMenuClick () {
        this.props.globalMenuToggle(this.props.globalMenuOpen)
    }

    render () {
        const content = this.props.user.id
            ? (
                <div>
                        <ProjectsTable userRowId={this.props.user.rowId}/>
                        <AddProjectDialog initialValues={{ author: this.props.user.rowId }} />
                </div>
            )
            : (
                <div>Login to view projects</div>
            )

        return (
            <div>
                    <AppBar
                        title="Give R&D time"
                        onLeftIconButtonTouchTap={() => this.handleMenuClick()}
                        iconElementRight={<LoginButton />}
                    />
                <div>
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
                        <MenuItem
                            containerElement={<Link to ="/home" />}>Projects</MenuItem>
                        <MenuItem
                            onTouchTap={this.props.openDialog}>Add Project</MenuItem>
                        <MenuItem
                            containerElement={<Link to ="/" />}>My account</MenuItem>
                    </Drawer>
                </div>
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
    openDialog: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.project.login.user,
        globalMenuOpen: state.project.layout.globalMenuOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openDialog: actionsDialog.openDialog,
        globalMenuToggle: actions.globalMenuToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
