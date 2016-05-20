import React from "react"
import ReactDom from "react-dom"
import AppBar from 'material-ui/AppBar'
import Navigation from './components/Navigation.jsx';
import ProjectsTable from './components/ProjectsTable.jsx';
import AddProjectDialog from './components/AddProjectDialog.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class Main extends React.Component {
    handleMenuClick = () => this.refs.ProjectLeftNav.setState({open: true});

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <AppBar
                        title="Give R&D time"
                        onLeftIconButtonTouchTap={this.handleMenuClick}
                        isInitiallyOpen={true} />
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

ReactDom.render(<Main />, document.getElementById("main"));
