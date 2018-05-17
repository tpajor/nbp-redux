import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { signInOrOut, registerUserRequest } from './LoginActions';

import './Login.css';

class Login extends React.Component {
  state = {
    userName: '',
    pass: '',
    repeatPass: '',
    signUp: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.signUp) {
      this.props.registerUser(this.state.userName, this.state.pass, this.state.repeatPass, this.props.users);
    } else {
      this.props.signInOrOut(false, this.state.userName, this.state.pass, this.props.users);
    }
  };

  render() {
    const { signUp, userName, pass, repeatPass } = this.state;
    const { signingError, signingErrorMessage, signedIn } = this.props;
    if (signedIn) {
      return (
        <Redirect to='/' />
      );
    }
    return (
      <div className={'LoginForm'}>
        <Link to="/" className="LinkToNbp">
          Przejdź do kursów walut bez logowania
        </Link>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input className={`form-control ${signingError ? 'is-invalid': ''}`}
              type="text"
              value={userName}
              onChange={event => this.setState({ userName: event.target.value })}
              placeholder="Użytkownik"
            />
            {signingError ?
            <p style={{ color: 'red' }}>{signingErrorMessage}</p> :
            ''
            }
          </div>
          <div className="form-group">
            <input className={`form-control ${signingError ? 'is-invalid': ''}`}
              type="password"
              value={pass}
              onChange={event => this.setState({ pass: event.target.value })}
              placeholder="Hasło"
            />
          </div>
          {signUp ? 
            <div className="form-group">
              <input className={`form-control ${signingError ? 'is-invalid': ''}`}
                type="password"
                value={repeatPass}
                onChange={event => this.setState({ repeatPass: event.target.value })}
                placeholder="Powtórz hasło"
              />
            </div> : 
            ''
          }
          <div className="form-group">
            <button type="submit" className="btn btn-primary LoginButton">
              {!signUp ? 'Zaloguj' : 'Zarejestruj'}
            </button>
          </div>
        </form>
        <div className="form-group">
          <button onClick={() => this.setState(prevState => ({ signUp: !prevState.signUp }))} className="btn btn-info">
            {signUp ? 'Logowanie' : 'Zarejestruj sie'}
          </button>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  signingError: state.login.signingError,
  signingErrorMessage: state.login.signingErrorMessage,
  signedIn: state.login.signedIn,
  users: state.login.users,
});

const mapDispatchToProps = {
  signInOrOut: signInOrOut,
  registerUser: registerUserRequest,
};

Login.propTypes = {
  signingError: PropTypes.bool,
  signingErrorMessage: PropTypes.string,
  signedIn: PropTypes.bool,
  users: PropTypes.array,
  signInOrOut: PropTypes.func,
  registerUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);