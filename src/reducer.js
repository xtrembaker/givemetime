//import {Map} from 'immutable';


export default function (state = {}, action) {
    switch (action.type) {
        case 'CREATE_PROJECT' :
            var newProjectsList = state.projects.concat([{
                id: action.id,
                title: action.title,
                estimate: action.estimate,
                acquired: action.acquired,
                description: action.description,
                author: action.author,
            }]);
            return Object.assign({}, state, {projects: newProjectsList});
        case 'GIVE_TIME' :
            console.log(action.amount);
            var newCredit = state.user.credit - action.amount;
            var newUser = {name: state.user.name, credit: newCredit};
            var newProjectList = [];
            console.log(state.projectsList);
            for (var project in state.projectsList) {
                console.log(project);
                if (project.id == action.projectId) {
                    console.log('found');
                }
            }

            return Object.assign({}, state, {user: newUser});

        case 'ADD_PROJECT_DIALOG_OPEN':
            let addProjectDialogOpen = Object.assign({}, state.addProjectDialog, {open: true});
            return Object.assign({}, state, {addProjectDialog: addProjectDialogOpen});

        case 'ADD_PROJECT_DIALOG_CLOSE':
            let addProjectDialogClosed = Object.assign({}, state.addProjectDialog, {open: false});
            return Object.assign({}, state, {addProjectDialog: addProjectDialogClosed});

        case 'VIEW_PROJECT_DIALOG_OPEN':
            let viewProjectDialogOpen = Object.assign({}, state.viewProjectDialog, {open: true});
            return Object.assign({}, state, {viewProjectDialog: viewProjectDialogOpen});

        case 'VIEW_PROJECT_DIALOG_CLOSE':
            let viewProjectDialogClosed = Object.assign({}, state.viewProjectDialog, {open: false});
            return Object.assign({}, state, {viewProjectDialog: viewProjectDialogClosed});

        case 'PROJECT_FORM_CHANGE':
            let newFormValues = {};
            newFormValues[action.prop] = action.value;
            let addProjectDialogFormChange = Object.assign({}, state.addProjectDialog, newFormValues);
            return Object.assign({}, state, {addProjectDialog: addProjectDialogFormChange});
    };
    return state;
}
