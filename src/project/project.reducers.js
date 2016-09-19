import * as constants from './project.actionTypes.js'

export default function (state = { projects: [] }, action) {
    switch (action.type) {
    case constants.PROJECT_FETCHED:
        return Object.assign({}, state, {
            projects: state.projects.concat([{
                id: action.id,
                rowId: action.rowId,
                name: action.name,
                time: action.time,
                title: action.title,
                estimate: action.estimate,
                acquired: action.acquired,
                description: action.description,
                author: action.author,
            }]),
        })
    default:
        return state
    }
}