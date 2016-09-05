export const getGraphQL = (payload, variables, onSuccess, onError) => {
    onSuccess = onSuccess || ((a) => a)
    return (dispatch) => {
        onError = onError || ((a) => dispatch(apologize(a)))
        return new Promise((resolve) => {
            let request = new XMLHttpRequest()
            request.open('POST', '/graphql', true)
            request.setRequestHeader('Content-Type', 'application/json')
            request.send(JSON.stringify({ query: payload, variables: variables }))
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    resolve(request.responseText)
                }
            }
        })
        .catch((response) => onError(JSON.parse(response)))
        .then((response) => {
            response = JSON.parse(response)
            if (response.errors) {
                onError(response)
            } else {
                onSuccess(response.data)
            }
        })
    }
}


export const projectFetched = (id, row_id, title, estimate, acquired, description) => {
    return {
        type: 'PROJECT_FETCHED',
        id: id,
        rowId: row_id,
        estimate: estimate,
        acquired: acquired,
        description: description,
        title: title,
    }
}

export const projectDeleted = (id) => {
    return {
        type: 'PROJECT_DELETED',
        id: id,
    }
}

export const apologize = (msg) => {
    return {
        type: 'APOLOGIZE',
        message: msg,
    }
}



export const globalMenuToggle = (open) => {
    return {
        type: 'GLOBAL_MENU_TOGGLE',
        open: !!open,
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
        id: id,
    }
}