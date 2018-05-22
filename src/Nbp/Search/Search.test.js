import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from './Search';
import { searchViewData } from '../../__mockData__/mockedData'


Enzyme.configure({ adapter: new Adapter() });

const initialState = { 
  currencyCode: '',
  autocomplete: [],
  inputError: false,
  activeItemPosition: 0,
  hover: false,
};

function setup() {
  const props = {
    searchError: searchViewData.searchError,
    currenciesTable: searchViewData.currenciesTable,
    getCurrency: jest.fn(),
    getCurrenciesTable: jest.fn(),
  };

  const enzymeWrapper = shallow(<Search {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('Card component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('form').length).toBe(1);
    expect(enzymeWrapper.find('form').hasClass('Form')).toBe(true);

    expect(enzymeWrapper.find('div').length).toBe(1);
    expect(enzymeWrapper.find('div').hasClass('form-group col-8 Form FormInput')).toBe(true);

    expect(enzymeWrapper.find('button').length).toBe(1);
    expect(enzymeWrapper.find('button').hasClass('btn btn-primary col-4 SearchButton')).toBe(true);

    expect(enzymeWrapper.find('input').length).toBe(1);
    expect(enzymeWrapper.find('input').hasClass('form-control ')).toBe(true);
    enzymeWrapper.setProps({ ...props, searchError: true });
    expect(enzymeWrapper.find('input').hasClass('form-control is-invalid')).toBe(true);
    enzymeWrapper.setProps({ ...props });
    enzymeWrapper.setState({ ...initialState, inputError: true });
    expect(enzymeWrapper.find('input').hasClass('form-control is-invalid')).toBe(true);
    enzymeWrapper.setState({ ...initialState });

    expect(enzymeWrapper.find('p').length).toBe(0);
    enzymeWrapper.setProps({ ...props, searchError: true });
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toEqual('Błąd serwera. Spróbuj ponownie później.');
    enzymeWrapper.setState({ ...initialState, inputError: true });
    expect(enzymeWrapper.find('p').length).toBe(2);
    enzymeWrapper.setProps({ ...props });
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toEqual('Wpisz trzyliterowy kod waluty, np. "USD", "chf"');
    enzymeWrapper.setState({ ...initialState });

    expect(enzymeWrapper.find('ol').length).toBe(0);
    enzymeWrapper.setState({ ...initialState, autocomplete: props.currenciesTable });
    expect(enzymeWrapper.find('ol').length).toBe(1);
    expect(enzymeWrapper.find('li').length).toEqual(props.currenciesTable.length);
    expect(enzymeWrapper.find('p').length).toEqual(props.currenciesTable.length);
    expect(enzymeWrapper.find('button').length).toEqual(props.currenciesTable.length + 1);
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should get currencies table for autocomplete onFocus on input', () => {
    const { enzymeWrapper, props } = setup();
    const getCurrenciesTableInput = enzymeWrapper.find('input');
    getCurrenciesTableInput.simulate('focus');
    expect(props.getCurrenciesTable.mock.calls.length).toBe(1);
  });

  it('should get currency data from nbp api if the currency exists in api', () => {
    const { enzymeWrapper, props } = setup();
    const getCurrencyForm = enzymeWrapper.find('form');
    getCurrencyForm.simulate('submit', { preventDefault: () => {} });
    expect(props.getCurrency.mock.calls.length).toBe(0);
    expect(enzymeWrapper.state([ 'inputError' ])).toBe(true);

    enzymeWrapper.setState({ ...initialState, currencyCode: 'usd', inputError: true, autocomplete: ['USD'] });
    enzymeWrapper.setProps({ ...props, currenciesTable: props.currenciesTable.map(currency => currency.toUpperCase()) });
    getCurrencyForm.simulate('submit', { preventDefault: () => {} });
    expect(props.getCurrency.mock.calls.length).toBe(1);
    expect(enzymeWrapper.state([ 'inputError' ])).toBe(false);
    expect(enzymeWrapper.state([ 'autocomplete' ])).toEqual([]);
  });
});