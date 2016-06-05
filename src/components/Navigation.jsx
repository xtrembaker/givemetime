import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import injectTapEventPlugin from 'react-tap-event-plugin'
import AppBar from 'material-ui/AppBar'
injectTapEventPlugin()

export default class Navigation extends React.Component {

    constructor (props) {
        super(props)
        this.state = { open: false }
    }

    handleToggle () {
        this.setState({ open: !this.state.open })
    }
    handleClose () {
        this.setState({ open: false })
    }

    render () {
        return (
            <div>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <AppBar
                        title="Give R&D time"
                        onLeftIconButtonTouchTap={this.handleClose}
                        isInitiallyOpen={true}
                    />
                    <MenuItem onTouchTap={this.handleClose}>Projects</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>Add project</MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>My account</MenuItem>
                </Drawer>
            </div>
        )
    }
}