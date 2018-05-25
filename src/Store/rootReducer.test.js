import rootReducer from './rootReducer';
import { createStore } from 'redux';
import { initialState as initialLoginState } from '../Login/LoginReducer';
import { initialState as initialDetailState } from '../Nbp/Detail/DetailReducer';
import { initialState as initialSearchState } from '../Nbp/Search/SearchReducer';

const store = createStore(rootReducer);

describe('rootReducer', () => {
  it('should combine reducers', () => {
    expect(store.getState().login).toEqual(initialLoginState);
    expect(store.getState().search).toEqual(initialSearchState);
    expect(store.getState().detail).toEqual(initialDetailState);
  });
});
