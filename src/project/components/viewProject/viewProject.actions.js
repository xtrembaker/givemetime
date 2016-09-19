import * as constants from './viewProject.actionTypes.js'

export function closeDialog () {
    return (dispatch) => {
        dispatch(closeProjectDialog())
    }
}

export function onTap (id) {
    return (dispatch) => {
        dispatch(openProjectDialog(id))
    }
}

export const closeProjectDialog = () => {
    return {
        type: constants.VIEW_PROJECT_DIALOG_CLOSE,
    }
}
export const openProjectDialog = (id) => {
    return {
        type: constants.VIEW_PROJECT_DIALOG_OPEN,
        id: id,
    }
}