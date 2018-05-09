import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import MainView from './MainView';
import Login from './Login/Login';

const App = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={MainView} />
        <Route path='/login' component={Login} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({ 
  signedIn: state.signedIn 
});

export default connect(mapStateToProps)(App);