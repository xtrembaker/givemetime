import React from 'react'
import ReactDom from 'react-dom'
import giveMeTimeReducers from './reducer.js'
import Layout from './components/Layout.jsx'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

const initialState = {
    user: {},
    addProjectDialog: {
        open: false,
        title: '',
        estimate: 0,
        author: '',
    },
    viewProjectDialog: {
        openId: null,
    },
    giveTimeDialog: {
        openId: null,
        userCredit: 1,
        amount: 10,
    },
    projects: [],
}

const store = createStore(giveMeTimeReducers, initialState, applyMiddleware(thunkMiddleware))

ReactDom.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('main')
)
