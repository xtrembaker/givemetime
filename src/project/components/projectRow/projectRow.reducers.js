import * as constants from './projectRow.actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
    case constants.PROJECT_DELETED:
        return { ...state,
            projects: state.projects.filter(project => project.id !== action.id),
        }
    default:
        return state
    }
}