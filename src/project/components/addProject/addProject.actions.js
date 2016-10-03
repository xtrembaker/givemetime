import { getGraphQL } from '../../../common/common.actions'
import * as constants from './addProject.actionTypes'

export function createProject ({ title, estimate, description, authorId }) {
    return dispatch => {
        dispatch(getGraphQL(`
            mutation createProject(
                $title: String!,
                $estimate: Int!,
                $acquired: Int!,
                $description: String,
                $authorId: Int!
            ){
                insertProject(input: {
                    title: $title,
                    estimate: $estimate,
                    acquired: $acquired,
                    description: $description,
                    authorId: $authorId
                }) {
                    project {
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
            }`,
            {
                title,
                estimate,
                description,
                acquired: 0,
                authorId,
            },
            response => {
                dispatch(projectCreated(
                    response.insertProject.project.id,
                    response.insertProject.project.rowId,
                    response.insertProject.project.title,
                    response.insertProject.project.estimate,
                    response.insertProject.project.acquired,
                    response.insertProject.project.description,
                    response.insertProject.project.personByAuthorId.fullname
                ))
            }
        ))
    }
}

export const projectCreated = (id, row_id, title, estimate, acquired, description) => {
    return {
        type: constants.PROJECT_CREATED,
        id: id,
        rowId: row_id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}
