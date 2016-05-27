

export const projectCreated = (id, acquired, estimate, title, description) => {
    return {
        type: 'PROJECT_CREATED',
        id: id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}

export const addProjectDialogToggle = (open) => {
    if (open) {
        return {
            type: 'ADD_PROJECT_DIALOG_OPEN',
        }
    } else {
        return {
            type: 'ADD_PROJECT_DIALOG_CLOSE',
        }
    }
}

export const closeProjectDialog = () => {
    return {
        type: 'VIEW_PROJECT_DIALOG_CLOSE',
    }
}
export const openProjectDialog = (id) => {
    return {
        type: 'VIEW_PROJECT_DIALOG_OPEN',
        id: id
    }
}


export const closeGiveTimeDialog = () => {
    return {
        type: 'GIVE_TIME_DIALOG_CLOSE',
    }
}
export const openGiveTimeDialog = (id) => {
    return {
        type: 'GIVE_TIME_DIALOG_OPEN',
        id: id
    }
}
export const giveTime = (amount, projectId) => {
    return {
        type: 'GIVE_TIME',
        amount: amount,
        id: projectId
    }
}
export const giveTimeFormChange = (amount, projectId) => {
    return {
        type: 'GIVE_TIME_FORM_CHANGE',
        amount: amount,
        id: projectId
    }
}

// create dependency between store structure and redux connector but small amount of code :)
export const projectFormChange = (prop, value) => {
    return {
        type: 'PROJECT_FORM_CHANGE',
        prop: prop,
        value: value
    }
}
