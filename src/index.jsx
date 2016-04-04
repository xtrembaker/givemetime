import React from "react"
import ReactDom from "react-dom"
import RaisedButton from 'material-ui/lib/raised-button';



import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import Navigation from './components/Navigation.jsx';
import Projects from './components/Projects.jsx';


class Main extends React.Component {
    handleMenuClick = () => this.refs.ProjectLeftNav.setState({open: true});

    render() {
        return <div>
        <AppBar  title="Give R&D time" onLeftIconButtonTouchTap={this.handleMenuClick}
            isInitiallyOpen={true}  iconElementRight={<FlatButton label="ADD PROJECT" />}/>
        <Navigation ref="ProjectLeftNav" open="false"/>
        <Projects/>
        </div>;
    }
}

ReactDom.render(<Main />, document.getElementById("main"));
