import React, { PropTypes } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import * as actions from './login.actions'
import { bindActionCreators } from 'redux'

export class LoginButton extends React.Component {

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
                    onSuccess={this.props.createUserIfNotExists.bind(this)}
                    onFailure={this.props.failureError.bind(this)}>
                    <script></script>
                    Login
                </GoogleLogin>
            )
        }
    }
}

LoginButton.propTypes = {
    createUserIfNotExists: PropTypes.func.isRequired,
    failureError: PropTypes.func.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        fullname: PropTypes.string,
        credit: PropTypes.number,
    }).isRequired,
    handleLogout: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        user: state.project.login.user,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleLogout: actions.handleLogout,
        failureError: actions.failureError,
        createUserIfNotExists: actions.createUserIfNotExists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
