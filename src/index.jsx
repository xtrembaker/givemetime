import React from 'react'
import ReactDom from 'react-dom'
import Layout from './components/Layout.jsx'
import { Provider } from 'react-redux'

import configureStore from './configureStore.js'

// Don't do this! You’re bringing DevTools into the production bundle.
import DevTools from './components/DevTools.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const initialState = {
    user: {},
    globalMenuOpen: false,
    addProjectDialog: {
        open: false,
        openProject: {}
    },
    viewProjectDialog: {
        openId: null,
    },
    giveTimeDialog: {
        openId: null,
    },
    projects: [],
}

const store = configureStore({
    project: initialState,
})

ReactDom.render(
    <Provider store={store}>
        <div>
            <Layout />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('main')
)
