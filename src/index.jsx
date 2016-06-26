import React from 'react'
import ReactDom from 'react-dom'
import Layout from './components/Layout.jsx'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './configureStore.js'

// Don't do this! You’re bringing DevTools into the production bundle.
import DevTools from './components/DevTools.jsx'

const initialState = {
    user: {},
    globalMenuOpen: false,
    addProjectDialog: {
        open: false,
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
});

ReactDom.render(
    <Provider store={store}>
        <div>
            <Layout />
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('main')
)
