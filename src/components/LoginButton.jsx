import React, { PropTypes } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import { getGraphQL, apologize, userLoggedIn, userLoggedOut } from '../actions.js'


export class LoginButton extends React.Component {

    handleGoogleResponse (response) {
        this.props.createUserIfNotExists(response)
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
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
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
                    } else {
                        dispatch(apologize('Cannot create user'))
                    }
                }
            ))
        },
        handleLogout : () => {
            dispatch(userLoggedOut())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
