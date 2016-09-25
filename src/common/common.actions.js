import * as constants from './common.actionTypes'
import 'isomorphic-fetch'
import * as config from '../config'

export const getGraphQL = (query, variables, onSuccess, onError) => {
    onSuccess = onSuccess || (a => a)
    return dispatch => {
        onError = onError || (a => dispatch(apologize(a)))
        return fetch(`${config.API_URL}/graphql`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ query, variables }),
        })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
            return Promise.reject(response)
        })
        .catch(err => {
            if (err.json) {
                return err.json()
            }
            return { errors: [ err ] }
        })
        .then(response => {

            if (response.errors) {
                onError(response.errors.map(err => err.message || err).join('. '))
            } else {
                onSuccess(response.data)
            }
        })
    }
}

export const apologize = msg => ({
    type: constants.APOLOGIZE,
    message: msg,
})
