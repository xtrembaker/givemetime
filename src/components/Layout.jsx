import React from "react"
import AppBar from 'material-ui/AppBar'
import Navigation from './Navigation.jsx';
import ProjectsTable from './ProjectsTable.jsx';
import AddProjectDialog from './AddProjectDialog.jsx';
import LoginButton from './LoginButton.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Layout extends React.Component {
    handleMenuClick = () => this.refs.ProjectLeftNav.setState({open: true});

    render() {
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

                {/*<ProjectsGrid/>*/}

                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <ProjectsTable/>
                </MuiThemeProvider>

                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <AddProjectDialog />
                </MuiThemeProvider>
            </div>
        );
    }
}