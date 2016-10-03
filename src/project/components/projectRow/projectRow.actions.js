import { getGraphQL } from '../../../common/common.actions'
import * as constants from './projectRow.actionTypes'

export function deleteProject (rowId) {
    return dispatch => {
        dispatch(getGraphQL(null, `
            mutation deleteProject(
                $rowId: Int!
            ) {
                deleteProject(input: {
                    rowId: $rowId
                }) {
                    project {
                    id,
                    rowId
                  }
                }
            }`,
            { rowId },
            response => dispatch(projectDeleted(response.deleteProject.project.id))
        ))
    }
}

export const projectDeleted = id => {
    return {
        type: constants.PROJECT_DELETED,
        id: id,
    }
}