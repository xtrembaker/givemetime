import { getGraphQL } from '../../../common/common.actions.js'
import * as constants from './addProject.actionTypes'
export function openDialog () {
    return (dispatch) => {
        dispatch(addProjectDialogToggle(true))
    }
}

export function closeDialog () {
    return (dispatch) => {
        dispatch(addProjectDialogToggle(false))
    }
}

export function onSubmit (form) {
    return (dispatch) => {
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
                title: form.title,
                estimate: form.estimate,
                description: form.description,
                acquired: 0,
                authorId: form.author,
            },
            (response) => {
                dispatch(projectCreated(
                    response.insertProject.project.id,
                    response.insertProject.project.rowId,
                    response.insertProject.project.title,
                    response.insertProject.project.estimate,
                    response.insertProject.project.acquired,
                    response.insertProject.project.description,
                    response.insertProject.project.personByAuthorId.fullname
                ))
                dispatch(addProjectDialogToggle(false))
            }
        ))
    }
}

export const addProjectDialogToggle = (open) => {
    return {
        type: constants.ADD_PROJECT_DIALOG_TOGGLE,
        open: !!open,
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
