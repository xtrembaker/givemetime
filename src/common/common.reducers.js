import * as constants from './common.actionTypes.js'

export default function (state = {}, action) {
    switch (action.type) {
    case constants.APOLOGIZE:
        console.error(action.message) // eslint-disable-line no-console
        return state
    default:
        return state
    }
}