import * as constants from './projectResultsRow.actionTypes.js'

export default function (state = {}, action) {
    switch (action.type) {
    case constants.PROJECT_DELETED:
        return Object.assign({}, state, {
            projects: state.projects.filter((project) => project.id !== action.id),
        })
    default:
        return state
    }
}