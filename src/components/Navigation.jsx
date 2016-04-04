import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/lib/app-bar'
injectTapEventPlugin();

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <LeftNav
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar 
            title="Give R&D time" 
            onLeftIconButtonTouchTap={this.handleClose}
            isInitiallyOpen={true} 
          />
          <MenuItem onTouchTap={this.handleClose}>Projects</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Add project</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>My account</MenuItem>
        </LeftNav>
      </div>
    );
  }
}