import React from "react"
import ReactDom from "react-dom"
import { Provider } from 'react-redux'
import giveMeTimeReducers from './reducer.js';
import Layout from './components/Layout.jsx';
import { createStore } from 'redux'


let store = createStore(giveMeTimeReducers, {
    user: {
        credit: 10
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
      open: false,
      /*title: 'Test',
      estimate: 123,
      acquired: 123,
      author: 'Toto'*/
    }
})

ReactDom.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById("main")
)
