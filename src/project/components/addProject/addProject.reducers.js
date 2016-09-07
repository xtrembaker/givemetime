import * as constants from './addProject.actionTypes.js'

export default function (state = { addProjectDialog: {
    open: false,
} }, action) {
    switch (action.type) {
    case constants.PROJECT_CREATED:
    case constants.ADD_PROJECT_DIALOG_TOGGLE:
        return Object.assign({}, state, {
            addProjectDialog: Object.assign({}, state.addProjectDialog, { open: action.open }),
        })
    default:
        return state
    }
}