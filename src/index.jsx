import React from "react"
import ReactDom from "react-dom"
import { Provider } from 'react-redux'
import giveMeTimeReducers from './reducer.js';
import Layout from './components/Layout.jsx';
import { createStore } from 'redux'


let store = createStore(giveMeTimeReducers, {
    user: {
        credit: 10
    }
})

ReactDom.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById("main")
)
