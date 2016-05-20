import React from 'react';
import GoogleLogin from 'react-google-login';

export default class LoginButton extends React.Component {

    handleGoogleResponse = (response) => {
        console.log(response);
    };

    render() {
        return (
            <GoogleLogin
                clientId="673157831962-gcgp4mj9mgadau0nh9pbaikhbmqkl04d.apps.googleusercontent.com"
                buttonText="Login"
                callback={this.handleGoogleResponse}>
                <script></script>
                Login
            </GoogleLogin>
        );
    }
}