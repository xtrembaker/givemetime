import React, { PropTypes } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import { getGraphQL, apologize, userLoggedIn, userLoggedOut } from '../actions.js'

const USER_TOKEN_KEY = 'userId'

export class LoginButton extends React.Component {

    handleGoogleResponse (response) {
        this.props.createUserIfNotExists(response)
    }

    componentDidMount () {
        this.props.checkSavedUserId()
    }

    render () {

        if (this.props.user.id) {
            return (
                <div>
                    {this.props.user.fullname}<br/> Crédits : {this.props.user.credit}<br/>
                    <button onClick={this.props.handleLogout}>Logout</button>
                </div>
            )
        } else {
            return (
                <GoogleLogin
                    clientId="673157831962-gcgp4mj9mgadau0nh9pbaikhbmqkl04d.apps.googleusercontent.com"
                    buttonText="Login"
                    callback={this.handleGoogleResponse.bind(this)}>
                    <script></script>
                    Login
                </GoogleLogin>
            )
        }
    }
}

LoginButton.propTypes = {
    createUserIfNotExists: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        fullname: PropTypes.string,
        credit: PropTypes.number,
    }).isRequired,
    handleLogout: PropTypes.func.isRequired,
    checkSavedUserId: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        user: state.project.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUserIfNotExists: (response) => {

            const fullname = response.getBasicProfile().getName()
            const email = response.getBasicProfile().getEmail()
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
                (createUserResponse) => {
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
        },


        checkSavedUserId: () => {
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
                waitGoogleAuthLoaded()
            }

        },

        handleLogout : () => {
            dispatch(userLoggedOut())

            // remove google user token
            localStorage.removeItem(USER_TOKEN_KEY)
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
