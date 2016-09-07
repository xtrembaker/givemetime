import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore.js'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = configureStore({

})

import Routes from './Route'

ReactDom.render(
    <Provider store={store}>
        <div>
            <Routes />
        </div>
    </Provider>,
    document.getElementById('main')
)
