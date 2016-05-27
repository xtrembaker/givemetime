import React from "react"
import ReactDom from "react-dom"
import giveMeTimeReducers from './reducer.js';
import Layout from './components/Layout.jsx';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface('https://enriched-fluorine-353.myreindex.com/graphql');

const initialState = {
    user: {
        id: 12,
        credit: 20
    },
    addProjectDialog: {
        open: false,
        title: '',
        estimate: 0,
        author: ''
    },
    viewProjectDialog: {
        openId: null
    },
    giveTimeDialog: {
        openId: null,
        userCredit: 1,
        amount: 10
    }
};

const client = new ApolloClient({ networkInterface });
const store = createStore(
    combineReducers({
        global: giveMeTimeReducers,
        apollo: client.reducer(),
    }),
    {
        global: initialState
    },
    applyMiddleware(client.middleware())
)

ReactDom.render(
    <ApolloProvider store={store} client={client}>
        <Layout />
    </ApolloProvider>,
    document.getElementById("main")
)
