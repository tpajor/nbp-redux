import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginConnected, { Login } from './Login';
import { login, initialState } from '../__mockData__/mockedData';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

Enzyme.configure({ adapter: new Adapter() });

const initialComponentState = { 
  userName: '',
  pass: '',
  repeatPass: '',
  signUp: false,
};

const customState = { 
  userName: 'a',
  pass: 'b',
  repeatPass: 'b',
  signUp: true,
};

function setup() {
  const props = {
    signingError: false,
    signingErrorMessage: '',
    signedIn: false,
    users: login.users,
    signInOrOut: jest.fn(),
    registerUser: jest.fn(),
  };

  const enzymeWrapper = shallow(<Login {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('Login component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(5);
    enzymeWrapper.setState({ ...initialComponentState, signUp: true });
    expect(enzymeWrapper.find('div').length).toBe(6);
    expect(enzymeWrapper.find('div').first().hasClass('LoginForm')).toBe(true);
    expect(enzymeWrapper.find('div').at(1).hasClass('form-group')).toBe(true);
    expect(enzymeWrapper.find('div').at(2).hasClass('form-group')).toBe(true);
    expect(enzymeWrapper.find('div').at(3).hasClass('form-group')).toBe(true);
    expect(enzymeWrapper.find('div').at(4).hasClass('form-group')).toBe(true);
    expect(enzymeWrapper.find('div').last().hasClass('form-group')).toBe(true);
    enzymeWrapper.setState({ ...initialComponentState });

    expect(enzymeWrapper.find('input').length).toBe(2);
    enzymeWrapper.setState({ ...initialComponentState, signUp: true });
    expect(enzymeWrapper.find('input').length).toBe(3);
    expect(enzymeWrapper.find('input').first().hasClass('form-control ')).toBe(true);
    expect(enzymeWrapper.find('input').at(1).hasClass('form-control ')).toBe(true);
    expect(enzymeWrapper.find('input').last().hasClass('form-control ')).toBe(true);
    enzymeWrapper.setProps({ ...props, signingError: true });
    expect(enzymeWrapper.find('input').first().hasClass('form-control is-invalid')).toBe(true);
    expect(enzymeWrapper.find('input').at(1).hasClass('form-control is-invalid')).toBe(true);
    expect(enzymeWrapper.find('input').last().hasClass('form-control is-invalid')).toBe(true);
    enzymeWrapper.setState({ ...customState });
    expect(enzymeWrapper.find('input').first().props().value).toEqual('a');
    expect(enzymeWrapper.find('input').at(1).props().value).toEqual('b');
    expect(enzymeWrapper.find('input').last().props().value).toEqual('b');
    enzymeWrapper.setState({ ...initialComponentState });
    enzymeWrapper.setProps({ ...props });

    expect(enzymeWrapper.find('p').length).toBe(0);
    enzymeWrapper.setProps({ ...props, signingError: true, signingErrorMessage: 'error' });
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toEqual('error');
    enzymeWrapper.setProps({ ...props });

    expect(enzymeWrapper.find('button').length).toBe(2);
    expect(enzymeWrapper.find('button').first().text()).toEqual('Zaloguj');
    expect(enzymeWrapper.find('button').last().text()).toEqual('Zarejestruj sie');
    enzymeWrapper.setState({ ...initialComponentState, signUp: true });
    expect(enzymeWrapper.find('button').first().text()).toEqual('Zarejestruj');
    expect(enzymeWrapper.find('button').last().text()).toEqual('Logowanie');

    enzymeWrapper.setProps({ ...props, signedIn: true });
    expect(enzymeWrapper.find('.LoginForm').length).toBe(0);
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should set state on change on inputs', () => {
    const { enzymeWrapper } = setup();
    let input = enzymeWrapper.find('input').first();

    expect(enzymeWrapper.state(['userName'])).toEqual('');
    input.simulate('change', { target: { value: 'a' } });
    expect(enzymeWrapper.state(['userName'])).toEqual('a');
    enzymeWrapper.setState({ ...initialState });

    input = enzymeWrapper.find('input').last();
    expect(enzymeWrapper.state(['pass'])).toEqual('');
    input.simulate('change', { target: { value: 'a' } });
    expect(enzymeWrapper.state(['pass'])).toEqual('a');
    enzymeWrapper.setState({ ...initialState, signUp: true });

    input = enzymeWrapper.find('input').last();
    expect(enzymeWrapper.state(['repeatPass'])).toEqual('');
    input.simulate('change', { target: { value: 'a' } });
    expect(enzymeWrapper.state(['repeatPass'])).toEqual('a');
  });

  it('should call proper function on submit', () => {
    const { enzymeWrapper, props } = setup();
    const form = enzymeWrapper.find('form');
    
    enzymeWrapper.setState({ ...customState, signUp: false });
    form.simulate('submit', { preventDefault: () => {} });
    expect(props.signInOrOut.mock.calls.length).toBe(1);
    expect(props.signInOrOut).toHaveBeenCalledWith(false, 'a', 'b', props.users);

    enzymeWrapper.setState({ ...customState });
    form.simulate('submit', { preventDefault: () => {} });
    expect(props.registerUser.mock.calls.length).toBe(1);
    expect(props.registerUser).toHaveBeenCalledWith('a', 'b', 'b', props.users);
  });

  it('should set signUp flag in state on second button click', () => {
    const { enzymeWrapper } = setup();
    const button = enzymeWrapper.find('button').last();
    
    expect(enzymeWrapper.state(['signUp'])).toBe(false);
    button.simulate('click');
    expect(enzymeWrapper.state(['signUp'])).toBe(true);
    button.simulate('click');
    expect(enzymeWrapper.state(['signUp'])).toBe(false);
  });

  it('should map state and dispatch to props', () => {
    const store = mockStore(initialState);
    const enzymeWrapper = shallow(<LoginConnected store={store} />);
    expect(enzymeWrapper.props().signingError).toBe(true);
    expect(enzymeWrapper.props().signingErrorMessage).toEqual('error');
    expect(enzymeWrapper.props().signedIn).toBe(true);
    expect(enzymeWrapper.props().users).toEqual(login.users);
    expect(typeof enzymeWrapper.props().signInOrOut).toBe('function');
    expect(typeof enzymeWrapper.props().registerUser).toBe('function');
  });
});