import { getGraphQL } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ amount, userRowId, projectRowId }) {
    return dispatch => {
        dispatch(getGraphQL(null, `
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
                credit: amount,
                userRowId: userRowId,
                projectRowId: projectRowId,
            },
            () => {
                dispatch(gaveTime(amount, projectRowId))
            }
        ))
    }
}

export const gaveTime = (amount, projectId) => {
    return {
        type: constants.GAVE_TIME,
        amount: amount,
        id: projectId,
    }
}
