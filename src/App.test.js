import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppConnected, {App} from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './__mockData__/mockedData';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(initialState);

function setup() {
  const props = {
    fetchUsers: jest.fn(),
  };

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('App component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(1);

    expect(enzymeWrapper.find('Route').length).toBe(2);

    expect(enzymeWrapper.find('Route').first().props().path).toEqual('/');

    expect(enzymeWrapper.find('Route').last().props().path).toEqual('/login');
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should map actions to props', () => {
    const enzymeWrapper = shallow(<AppConnected store={store} />);

    expect(typeof enzymeWrapper.props().fetchUsers).toBe('function');
  });

  it('should call fetchUsers on mount', () => {
    const { enzymeWrapper, props } = setup();
    
    expect(props.fetchUsers.mock.calls.length).toBe(1);
    
    const instance = enzymeWrapper.instance();
    instance.componentWillMount();
    expect(props.fetchUsers.mock.calls.length).toBe(2);
  });
});