import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import DevTools from './components/DevTools.jsx'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import giveMeTimeReducer from './reducer.js'
import { persistState } from 'redux-devtools'

function getDebugSessionKey() {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
    return (matches && matches.length > 0)? matches[1] : null
}

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunkMiddleware),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
);

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    const store = createStore(combineReducers({
        project: giveMeTimeReducer,
        form: formReducer,
    }), initialState, enhancer);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducer.js', () =>
            store.replaceReducer(combineReducers({
                project: require('./reducer.js'),
                form: formReducer,
            }) /*.default if you use Babel 6+ */ )
        )
    }

    return store;
}