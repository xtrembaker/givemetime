import React from "react"
import ReactDom from "react-dom"
import { Provider } from 'react-redux'
import giveMeTimeReducers from './reducer.js';
import Layout from './components/Layout.jsx';
import { createStore } from 'redux'


let store = createStore(giveMeTimeReducers, {
    user: {
        id: 12,
        credit: 20
    },
    projects: [{
        id: 1,
        title: "Bastion v2",
        estimate: 24,
        acquired: 12,
        description: "",
        author: "Denis Fortin",
    },{
        id: 2,
        title: "Steam Learn Website",
        estimate: 32,
        acquired: 24,
        description: "Vote",
        author: "Clément Prévost",
    }],
    addProjectDialog: {
        open: false,
        title: 'Test',
        estimate: 123,
        author: 'Toto'
    },
    viewProjectDialog: {
      openId: null
    },
    giveTimeDialog: {
      openId: null,
      userCredit: 1,
      amount: 10
    }
})

ReactDom.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById("main")
)
