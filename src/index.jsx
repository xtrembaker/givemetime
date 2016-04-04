import React from "react"
import ReactDom from "react-dom"
import RaisedButton from 'material-ui/lib/raised-button';



import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import AppBar from 'material-ui/lib/app-bar'
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import LeftNav from 'material-ui/lib/left-nav';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import Navigation from './components/Navigation.jsx';
import ProjectsGrid from './components/ProjectsGrid.jsx';
import ProjectsTable from './components/ProjectsTable.jsx';

const style = {
  position: "absolute",
	right: 0,
	margin: 10,
	marginRight: 20,
};

class Main extends React.Component {
    handleMenuClick = () => this.refs.ProjectLeftNav.setState({open: true});

    render() {
        return <div>
        <AppBar  
        	title="Give R&D time" 
        	onLeftIconButtonTouchTap={this.handleMenuClick}
            isInitiallyOpen={true} />
        <Navigation ref="ProjectLeftNav" open="false"/>
        {/*<ProjectsGrid/>*/}
        <ProjectsTable/>
        <FloatingActionButton style={style} secondary={true}>
        	<ContentAdd />
        </FloatingActionButton>
        </div>;
    }
}

ReactDom.render(<Main />, document.getElementById("main"));
