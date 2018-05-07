import React from 'react';
import MainView from './MainView';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import currencies from './Reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  currencies,
  composeEnhancers(applyMiddleware(thunk))
);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <MainView />
        </Provider>
      </div>
    );
  }
}