import React from 'react'
import ReactDom from 'react-dom'
import giveMeTimeReducer from './reducer.js'
import Layout from './components/Layout.jsx'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'


const initialState = {
    user: {},
    addProjectDialog: {
        open: false,
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

const reducers = {
    project: giveMeTimeReducer,
    form: formReducer,
}

const reducer = combineReducers(reducers)
const store = createStore(reducer, {
    project: initialState,
}, applyMiddleware(thunkMiddleware))

ReactDom.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('main')
)
