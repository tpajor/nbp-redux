import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchUsers } from './Actions';

import MainView from './MainView';
import Login from './Login/Login';

class App extends React.Component {
  componentWillMount = () => {
    this.props.fetchUsers();
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={MainView} />
          <Route path='/login' component={Login} />
        </div>
      </BrowserRouter>
    );
  };
};

App.need = [() => { return fetchUsers(); }];

const mapDispatchToProps = {
  fetchUsers,
}

App.propTypes = {
  fetchUsers: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(App);