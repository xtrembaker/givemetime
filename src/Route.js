import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import App from './layout/layout.container.js'
import Home from './project/project.container.js'
import Add from './project/components/addProject/addProject.js'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class AppRoutes extends Component {
    render () {
        return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory}>
                <Route path="/">
                    <IndexRoute component={App} />
                    <Route path="home" component={Home} />
                    <Route path="add" component={Add} />
                </Route>
            </Router>
        </MuiThemeProvider>
        )
    }
}

export default connect()(AppRoutes)