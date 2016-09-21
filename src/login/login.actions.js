import { getGraphQL, apologize } from '../common/common.actions.js'
import * as constant from './login.actionTypes.js'

export function failureError (response) {
    return dispatch => {
        dispatch(apologize('Can\'t log in. Error : ' + response))
    }
}

export function createUserIfNotExists (response) {
    const fullname = response.getBasicProfile().getName()
    const email = response.getBasicProfile().getEmail()
    return dispatch => {
        dispatch(getGraphQL(`
            mutation registerPerson(
                $fullname: String!,
                $email: String!,
                $password: String!
            ) {
              personRegisterOrRetrieve(input: {
                fullname: $fullname,
                email: $email,
                password: $password
              }) {
                output {
                  id,
                  rowId,
                  fullname,
                  credit
                }
              }
            }
        `,
            {
                fullname: fullname,
                email: email,
                password: 'password',
            },
            createUserResponse => {
                if (createUserResponse.personRegisterOrRetrieve) {
                    const user = createUserResponse.personRegisterOrRetrieve.output
                    dispatch(userLoggedIn(user.id, user.rowId, user.fullname, user.credit))
                } else {
                    dispatch(apologize('Cannot create user'))
                }
            }
        ))
    }
}

export function handleLogout () {
    return dispatch => {
        dispatch(userLoggedOut())
    }
}

export const userLoggedIn = (id, rowId, fullname, credit) => {
    return {
        type: constant.USER_LOGGED_IN,
        id: id,
        rowId: rowId,
        fullname: fullname,
        credit : credit,
    }
}

export const userLoggedOut = () => {
    return {
        type: constant.USER_LOGGED_OUT,
        id: null,
        rowId: null,
        fullname: null,
        credit : null,
        projects : [],
    }
}