import React, { PropTypes } from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import * as actions from './login.actions'
import { bindActionCreators } from 'redux'
import * as config from '../config'

export class LoginButton extends React.Component {
    componentDidMount () {
        this.props.checkLocalUser()
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
                    clientId={config.GOOGLE_KEY}
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
    checkLocalUser: PropTypes.func.isRequired,
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
        createUserIfNotExists: actions.createUserIfNotExists,
        checkLocalUser: actions.checkLocalUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
