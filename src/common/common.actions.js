import * as constants from './common.actionTypes'
import 'isomorphic-fetch'
import * as config from '../config'

export const getGraphQL = (query, variables, onSuccess, onError) => {
    onSuccess = onSuccess || ((a) => a)
    return (dispatch) => {
        onError = onError || ((a) => dispatch(apologize(a)))
        return fetch(`${config.API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            }
            return Promise.reject(response)
        })
        .then((response) => {
            if (response.errors) {
                onError(response)
            } else {
                onSuccess(response.data)
            }
        })
        .catch((err) => {
            onError(err.message || err)
        })
    }
}

export const apologize = (msg) => {
    return {
        type: constants.APOLOGIZE,
        message: msg,
    }
}
