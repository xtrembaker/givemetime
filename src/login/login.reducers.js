import * as constants from './login.actionTypes.js'

export default function (state = { user: {} }, action) {
    switch (action.type) {
    case constants.USER_LOGGED_IN:
        return { ...state, user: {
            id : action.id,
            rowId: action.rowId,
            credit: action.credit,
            fullname: action.fullname,
        } }
    case constants.USER_LOGGED_OUT:
        return { ...state, user: {
            id : action.id,
            rowId: action.rowId,
            credit: action.credit,
            fullname: action.fullname,
        }, projects: [] }
    default:
        return state
    }
}