import React from "react"
import ReactDom from "react-dom"
import AppBar from 'material-ui/AppBar'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Navigation from './components/Navigation.jsx';
import ProjectsTable from './components/ProjectsTable.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const style = {
    position: "absolute",
    right: 0,
    margin: 10,
    marginRight: 20,
};

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
                    <FloatingActionButton style={style} secondary={true}>
                        <ContentAdd />
                    </FloatingActionButton>
                </MuiThemeProvider>
            </div>
        );
    }
}

ReactDom.render(<Main />, document.getElementById("main"));
