import * as constants from './viewProject.actionTypes.js'

export default function (state = { viewProjectDialog: {
    openId: null,
} }, action) {
    switch (action.type) {
    case constants.VIEW_PROJECT_DIALOG_OPEN:
        return Object.assign({}, state, {
            viewProjectDialog: Object.assign({}, state.viewProjectDialog, { openId: action.id }),
        })
    case constants.VIEW_PROJECT_DIALOG_CLOSE:
        return Object.assign({}, state, {
            viewProjectDialog: Object.assign({}, state.viewProjectDialog, { openId: null }),
        })
    default:
        return state
    }
}