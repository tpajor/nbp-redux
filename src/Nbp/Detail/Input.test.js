import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Input from './Input';


Enzyme.configure({ adapter: new Adapter() });

const initialState = { 
  numberOfData: '',
};

function setup() {
  const props = {
    currencyCodeToViewInDetail: 'USD',
    detailsInputError: false,
    detailsInputErrorMessage: '',
    getInputedNumberOfLastRates: jest.fn(),
  };

  const enzymeWrapper = shallow(<Input {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('Input component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.setState({ ...initialState });

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('form').length).toBe(1);
    expect(enzymeWrapper.find('form').hasClass('Form')).toBe(true);

    expect(enzymeWrapper.find('div').length).toBe(2);
    expect(enzymeWrapper.find('div').first().hasClass('form-group col-2 Input')).toBe(true);
    expect(enzymeWrapper.find('div').last().hasClass('form-group col-6 Form')).toBe(true);

    expect(enzymeWrapper.find('input').length).toBe(2);
    expect(enzymeWrapper.find('input').first().hasClass('form-control-plaintext')).toBe(true);
    expect(enzymeWrapper.find('input').first().props().value).toEqual('USD');
    expect(enzymeWrapper.find('input').last().hasClass('form-control ')).toBe(true);
    enzymeWrapper.setProps({ ...props, detailsInputError: true });
    expect(enzymeWrapper.find('input').last().hasClass('form-control is-invalid')).toBe(true);
    enzymeWrapper.setProps({ ...props });
    enzymeWrapper.setState({ numberOfData: 234 })
    expect(enzymeWrapper.find('input').last().props().value).toEqual(234);
    enzymeWrapper.setProps({ ...props, currencyCodeToViewInDetail: '' });
    expect(enzymeWrapper.find('input').last().props().value).toEqual('');

    expect(enzymeWrapper.find('p').length).toBe(0);
    enzymeWrapper.setProps({ ...props, detailsInputError: true, detailsInputErrorMessage: 'error' });
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toEqual('error');
    enzymeWrapper.setProps({ ...props });

    expect(enzymeWrapper.find('button').length).toBe(1);
    expect(enzymeWrapper.find('button').hasClass('btn btn-primary col-4 InputButton')).toBe(true);
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should change state on second input change', () => {
    const { enzymeWrapper } = setup();
    const input = enzymeWrapper.find('input').last();
    expect(enzymeWrapper.state(['numberOfData'])).toEqual('');
    input.simulate('change', { target: { value: 'u' } });
    expect(enzymeWrapper.state(['numberOfData'])).toEqual('u');
  });

  it('should call getInputedNumberOfLastRates on form submit', () => {
    const { enzymeWrapper, props } = setup();
    const form = enzymeWrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });
    expect(props.getInputedNumberOfLastRates.mock.calls.length).toBe(1);
  });
});