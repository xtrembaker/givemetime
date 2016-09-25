import { getGraphQL } from '../../../common/common.actions'
import * as constants from './giveTime.actionTypes'

export function giveTime ({ amount, userId, projectId }) {

    return dispatch => {
        dispatch(getGraphQL(`
            mutation giveTime(
                $projectId: ID!,
                $userId: ID!,
                $credit: Int!
            ){
                projectGiveTime(input: {
                    person: $userId,
                    project: $projectId,
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
                userId: userId,
                projectId: projectId,
            },
            () => {
                dispatch(gaveTime(amount, projectId))
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
