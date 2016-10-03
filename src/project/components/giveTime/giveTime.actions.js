import { getGraphQL } from '../../../common/common.actions.js'
import * as constants from './giveTime.actionTypes'

export function onSubmit (form) {
    return dispatch => {
        dispatch(getGraphQL(`
            mutation giveTime(
                $projectRowId: Int!,
                $userRowId: Int!,
                $credit: Int!
            ){
                projectGiveTime(input: {
                    personId: $userRowId,
                    projectId: $projectRowId,
                    amount: $credit
                }) {
                    output {
                        rowId,
                        acquired
                    }
                }
            }`,
            {
                credit: form.amount,
                userRowId: form.userRowId,
                projectRowId: form.projectRowId,
            },
            () => {
                dispatch(giveTime(form.amount, form.projectRowId))
                dispatch(closeGiveTimeDialog())
            }
        ))
    }
}

export function openDialog (id) {
    return dispatch => {
        dispatch(openGiveTimeDialog(id))
    }
}

export function closeDialog () {
    return dispatch => {
        dispatch(closeGiveTimeDialog())
    }
}

export const closeGiveTimeDialog = () => {
    return {
        type: constants.GIVE_TIME_DIALOG_CLOSE,
    }
}
export const openGiveTimeDialog = id => {
    return {
        type: constants.GIVE_TIME_DIALOG_OPEN,
        id: id,
    }
}

export const giveTime = (amount, projectId) => {
    return {
        type: constants.GIVE_TIME,
        amount: amount,
        id: projectId,
    }
}
