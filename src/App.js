import React from 'react';
import MainView from './MainView';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import currencies from './Reducer';

let store = createStore(
  currencies,
  applyMiddleware(thunk),
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