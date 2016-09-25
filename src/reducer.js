import { combineReducers } from 'redux'
import layout from './layout/layout.reducers'
import login from './login/login.reducers'
import giveTime from './project/components/giveTime/giveTime.reducers'
import projectResultsRow from './project/components/projectRow/projectRow.reducers'
import project from './project/project.reducers'
import common from './common/common.reducers'


const rootReducer = combineReducers({
    layout,
    login,
    giveTime,
    projectResultsRow,
    project,
    common })

export default rootReducer
