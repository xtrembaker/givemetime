import { getGraphQL } from '../common/common.actions.js'
import * as constants from './project.actionTypes'

export function loadProjects () {
    return (dispatch) => {
        dispatch(getGraphQL(`
            query {
                viewer {
                    projectNodes {
                        nodes {
                            id,
                            rowId,
                            title,
                            estimate,
                            acquired,
                            description,
                            personByAuthorId {
                                id,
                                fullname,
                                credit
                            }
                        }
                    }
                }
            }`,
            {},
            (response) => response.viewer.projectNodes.nodes
                .map((node) => dispatch(projectFetched(
                    node.id,
                    node.rowId,
                    node.title,
                    node.estimate,
                    node.acquired,
                    node.description,
                    node.personByAuthorId ? node.personByAuthorId.fullname : null
                )))
        ))
    }
}

export const projectFetched = (id, row_id, title, estimate, acquired, description) => {
    return {
        type: constants.PROJECT_FETCHED,
        id: id,
        rowId: row_id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}
