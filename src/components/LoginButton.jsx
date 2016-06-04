import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { getGraphQL, apologize, userLoggedIn, userLoggedOut } from '../actions.js';


class LoginButtonComponent extends React.Component {

    handleGoogleResponse = (response) => {
        this.props.createUserIfNotExists(response);
        console.log(response);
    };

    render() {
      if (this.props.user.id) {
        return (
            <div>
               {this.props.user.fullname}<br/> Crédits : {this.props.user.credit}<br/>
             <button onClick={this.props.handleLogout}>Logout</button>
            </div>
        );
      } else {
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
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      createUserIfNotExists: (response) => {
        let fullname = response.getBasicProfile().getName();
        dispatch(getGraphQL(`
          {
            viewer {personNodes(fullname: "${fullname}") {nodes {
             id,
             rowId,
             fullname,
             credit
           } } }
          }
          `,
          {},
          (ExistingResponse) =>
            dispatch => {
            console.log(ExistingResponse);
              if (!ExistingResponse.viewer.personNodes.nodes.length) {
                createUser(dispatch, response);
              } else {
                let user = ExistingResponse.viewer.personNodes.nodes[0];
                dispatch(userLoggedIn(user.id, user.rowId, user.fullname, user.credit));
              }
          },
          (response) => apologize(response)
        ))
      },
      handleLogout : () => {
        dispatch(userLoggedOut());
      }
    }
};

const createUser = (dispatch, response) => {
  var id = response.getBasicProfile().getId();
  var fullname = response.getBasicProfile().getName();
  var email = response.getBasicProfile().getEmail();
  dispatch(getGraphQL(`
    mutation {
      personRegister(input: {
        fullname: "${fullname}",
        email: "${email}",
        password: "password"
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
    {},
    (createUserResponse) =>
      dispatch => {
        if (createUserResponse.personRegister) {
          let user = createUserResponse.personRegister.output;
          dispatch(userLoggedIn(user.id, user.rowId, user.fullname, user.credit));
        } else {
          dispatch(apologize({message: "Impossible de créer l'utilisateur"}));
        }
      },
    (response) => apologize(response)
  ))
}

const LoginButton = connect(mapStateToProps, mapDispatchToProps)(LoginButtonComponent)

export default LoginButton;
