
export default function (state, action) {
    switch (action.type) {
    case 'PROJECT_DELETED':
        return Object.assign({}, state, {
            projects: state.projects.filter((project) => project.id !== action.id),
        })

    case 'USER_LOGGED_IN':
        return Object.assign({}, state, { user: {
            id : action.id,
            rowId: action.rowId,
            credit: action.credit,
            fullname: action.fullname,
        } })

    case 'USER_LOGGED_OUT':
        return Object.assign({}, state, { user: {
            id : action.id,
            rowId: action.rowId,
            credit: action.credit,
            fullname: action.fullname,
        }, projects: [] })

    case 'PROJECT_CREATED':
    case 'PROJECT_FETCHED':
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

    case 'ADD_PROJECT_DIALOG_TOGGLE':
        return Object.assign({}, state, {
            addProjectDialog: Object.assign({}, state.addProjectDialog, {
                open: action.open,
                openProject: {
                    id: action.id,
                    rowId: action.rowId,
                    name: action.name,
                    title: action.title,
                    acquired: action.acquired,
                    description: action.description,
                    author: action.author,
                },
            }),
        })

    case 'GLOBAL_MENU_TOGGLE':
        return Object.assign({}, state, { globalMenuOpen: action.open })

    case 'VIEW_PROJECT_DIALOG_OPEN':
        return Object.assign({}, state, {
            viewProjectDialog: Object.assign({}, state.viewProjectDialog, { openId: action.id }),
        })

    case 'VIEW_PROJECT_DIALOG_CLOSE':
        return Object.assign({}, state, {
            viewProjectDialog: Object.assign({}, state.viewProjectDialog, { openId: null }),
        })

    case 'GIVE_TIME_DIALOG_OPEN':
        return Object.assign({}, state, {
            giveTimeDialog: Object.assign({}, state.giveTimeDialog, {
                openId: action.id,
                userCredit: state.user.credit,
                amount: state.projects.reduce((agg, project) => {
                    return project.id === action.id ? Math.min(agg, project.estimate - project.acquired) : agg
                }, state.user.credit),
            }),
        })

    case 'GIVE_TIME_DIALOG_CLOSE':
        return Object.assign({}, state, {
            giveTimeDialog: Object.assign({}, state.giveTimeDialog, { openId: null, projectId: null }),
        })

    case 'GIVE_TIME':
        return Object.assign({}, state, {
            projects: state.projects.map(
                (project) => project.id === action.id
                    ? Object.assign({}, project, { acquired: project.acquired + action.amount })
                    : project
            ),
            user: Object.assign({}, state.user, { credit: state.user.credit - action.amount }),
        })

    case 'APOLOGIZE':
        console.error(action.message) // eslint-disable-line no-console
        return state
    }
    return state || {}
}
