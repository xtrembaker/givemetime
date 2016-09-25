import * as constants from './giveTime.actionTypes'

export default function (state = { giveTime: {
    openId: null,
} }, action) {
    switch (action.type) {
    case constants.GAVE_TIME:
        return { ...state,
            projects: state.projects.map(
                project => project.id === action.id
                    ? { ...project, acquired: project.acquired + action.amount }
                    : project
            ),
            user: { ...state.user, credit: state.user.credit - action.amount },
        }
    default:
        return state
    }
}