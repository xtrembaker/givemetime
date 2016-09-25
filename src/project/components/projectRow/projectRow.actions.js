import { getGraphQL } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function onDelete (id) {
    return dispatch => {
        dispatch(getGraphQL(`
            mutation deleteProject(
                $id: ID!
            ) {
                deleteProject(input: {
                    id: $id
                }) {
                    id
                }
            }`,
            { id: id },
            response => dispatch(projectDeleted(response.deleteProject.id))
        ))
    }
}

export const projectDeleted = id => {
    return {
        type: constants.ROJECT_DELETED,
        id: id,
    }
}