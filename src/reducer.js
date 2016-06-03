
export default function (state = {}, action) {
    switch (action.type) {
        case 'PROJECT_DELETED':
            const deletedProjectsList = state.projects.filter(project => project.id !== action.id);
            return Object.assign({}, state, {projects: deletedProjectsList});

        case 'USER_LOGGED_IN':
          return Object.assign({}, state, {user: {
            id : action.id,
            credit: action.credit,
            fullname: action.fullname
          }});

        case 'USER_LOGGED_OUT':
          return Object.assign({}, state, {user: {
            id : action.id,
            credit: action.credit,
            fullname: action.fullname,
          }, projects: []});

        case 'PROJECT_CREATED':
        case 'PROJECT_FETCHED':
            const newProjectsList = state.projects.concat([{
                id: action.id,
                name: action.name,
                time: action.time,
                title: action.title,
                estimate: action.estimate,
                acquired: action.acquired,
                description: action.description,
                author: action.author,
            }]);
            return Object.assign({}, state, {projects: newProjectsList});

        case 'ADD_PROJECT_DIALOG_OPEN':
            let addProjectDialogOpen = Object.assign({}, state.addProjectDialog, {open: true});
            return Object.assign({}, state, {addProjectDialog: addProjectDialogOpen});

        case 'ADD_PROJECT_DIALOG_CLOSE':
            let addProjectDialogClosed = Object.assign({}, state.addProjectDialog, {open: false});
            return Object.assign({}, state, {addProjectDialog: addProjectDialogClosed});

        case 'VIEW_PROJECT_DIALOG_OPEN':
            let viewProjectDialogOpen = Object.assign({}, state.viewProjectDialog, {openId: action.id});
            return Object.assign({}, state, {viewProjectDialog: viewProjectDialogOpen});

        case 'VIEW_PROJECT_DIALOG_CLOSE':
            let viewProjectDialogClosed = Object.assign({}, state.viewProjectDialog, {openId: null});
            return Object.assign({}, state, {viewProjectDialog: viewProjectDialogClosed});

        case 'GIVE_TIME_DIALOG_OPEN':
            let defaultAmount = state.projects.reduce((agg, project) => {
                return project.id === action.id ? Math.min(agg, project.estimate - project.acquired) : agg
            }, state.user.credit)
            let giveTimeDialogOpen = Object.assign({}, state.giveTimeDialog, {
                openId: action.id,
                userCredit: state.user.credit,
                amount: defaultAmount
            });
            return Object.assign({}, state, {giveTimeDialog: giveTimeDialogOpen});

        case 'GIVE_TIME_DIALOG_CLOSE':
            let giveTimeDialogClose = Object.assign({}, state.giveTimeDialog, {openId: null, projectId: null});
            return Object.assign({}, state, {giveTimeDialog: giveTimeDialogClose});

        case 'GIVE_TIME':
            let projects = state.projects.map(project => {
                if (project.id === action.id) {
                    return Object.assign({}, project, {acquired: project.acquired + action.amount});
                } else {
                    return project;
                }
            })
            let user = Object.assign({}, state.user, {credit: state.user.credit - action.amount});
            return Object.assign({}, state, {projects: projects, user: user});

        case 'GIVE_TIME_FORM_CHANGE':
            let amount = state.projects.reduce((agg, project) => {
                return project.id === action.id ? Math.min(agg, project.estimate - project.acquired) : agg
            }, Math.min(action.amount, state.user.credit))
            let giveTimeFormChange = Object.assign({}, state.giveTimeDialog, {
                amount: Math.max(0, amount)
            });
            return Object.assign({}, state, {giveTimeDialog: giveTimeFormChange});

        case 'PROJECT_FORM_CHANGE':
            let newFormValues = {};
            newFormValues[action.prop] = action.value;
            let addProjectDialogFormChange = Object.assign({}, state.addProjectDialog, newFormValues);
            return Object.assign({}, state, {addProjectDialog: addProjectDialogFormChange});
    };
    return state;
}
