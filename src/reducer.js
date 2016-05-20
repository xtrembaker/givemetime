//import {Map} from 'immutable';

function setState(state, newState) {
    return newState;
}

function editEstimate(element) {

}

export default function (state = {}, action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'CREATE_PROJECT' :
            var newProjectsList = [...state.projectsList, {
                id: action.id,
                name: action.name,
                time: action.time,
                author: action.author,
            }];
    debugger;
            return Object.assign({}, state, {projectsList: newProjectsList});
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
    };
    return state;
}
