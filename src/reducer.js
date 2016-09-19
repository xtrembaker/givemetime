import { combineReducers } from 'redux'
import layout from './layout/layout.reducers'
import login from './login/login.reducers'
import addProject from './project/components/addProject/addProject.reducers'
import giveTime from './project/components/giveTime/giveTime.reducers'
import projectResultsRow from './project/components/projectResultsRow/projectResultsRow.reducers'
import viewProject from './project/components/viewProject/viewProject.reducers'
import project from './project/project.reducers'
import common from './common/common.reducers'


const rootReducer = combineReducers({
    layout,
    login,
    addProject,
    giveTime,
    projectResultsRow,
    viewProject,
    project,
    common })

export default rootReducer
