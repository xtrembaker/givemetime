import * as loginActions from './login.actionTypes'
import * as giveTimeActions from '../project/components/giveTime/giveTime.actionTypes'

export default function (state = { user: {} }, action) {
    switch (action.type) {
    case loginActions.USER_LOGGED_IN:
        return { ...state, user: {
            id : action.id,
            rowId: action.rowId,
            credit: action.credit,
            fullname: action.fullname,
        } }
    case loginActions.USER_LOGGED_OUT:
        return { ...state, user: {
            id : action.id,
            rowId: action.rowId,
            credit: action.credit,
            fullname: action.fullname,
        }, projects: [] }

    case giveTimeActions.GAVE_TIME:
        return { ...state,
            user: { ...state.user, credit: state.user.credit - action.amount },
        }
    default:
        return state
    }
}