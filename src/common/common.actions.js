import * as constants from './common.actionTypes'

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

export const apologize = (msg) => {
    return {
        type: constants.APOLOGIZE,
        message: msg,
    }
}
