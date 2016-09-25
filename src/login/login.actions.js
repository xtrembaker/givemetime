import { getGraphQL, apologize } from '../common/common.actions.js'
import * as constant from './login.actionTypes.js'

const USER_TOKEN_KEY = 'userId'

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
                    // persist userId
                    dispatch(() => {
                        localStorage.setItem(USER_TOKEN_KEY, user.id)
                    })
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
        localStorage.removeItem(USER_TOKEN_KEY)
    }
}

export function checkLocalUser () {
    return dispatch => {
        // if the user is "google" logged in and an id is present in localstorage,
        // we try to fetch user from graphql and dispatch the userLoggedInAction

        const userId = localStorage.getItem(USER_TOKEN_KEY)

        // we need to wait google auth lib to be loaded
        const waitGoogleAuthLoaded = () => {

            if (window.gapi && window.gapi.auth2) {
                const auth2Instance = window.gapi.auth2.getAuthInstance()

                auth2Instance.isSignedIn.listen((loggedIn) => {

                    if (loggedIn) {
                        // fetch user info
                        dispatch(getGraphQL(`
                            query findPersonById($id: ID!) {
                              person(id: $id) {
                                id,
                                rowId,
                                fullname
                                credit
                                createdAt
                              }
                            }
                        `,
                            {
                                id: userId,
                            },
                            (userResponse) => {
                                const person = userResponse.person
                                dispatch(userLoggedIn(person.id, person.rowId, person.fullname, person.credit))
                            }
                        ))
                    }
                    else {
                        // the user has logged out Google Account stuff, clean local storage
                        localStorage.removeItem(USER_TOKEN_KEY)
                    }
                })
            }
            else {
                setTimeout(waitGoogleAuthLoaded, 50)
            }
        }

        if (userId) {
            return waitGoogleAuthLoaded()
        }
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