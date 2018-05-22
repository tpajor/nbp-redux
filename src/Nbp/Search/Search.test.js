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
    expect(enzymeWrapper.state(['inputError'])).toBe(true);

    enzymeWrapper.setState({ ...initialState, currencyCode: 'usd', inputError: true, autocomplete: ['USD'] });
    enzymeWrapper.setProps({ ...props, currenciesTable: props.currenciesTable.map(currency => currency.toUpperCase()) });
    getCurrencyForm.simulate('submit', { preventDefault: () => {} });
    expect(props.getCurrency.mock.calls.length).toBe(1);
    expect(enzymeWrapper.state(['inputError'])).toBe(false);
    expect(enzymeWrapper.state(['autocomplete'])).toEqual([]);
  });

  describe('should change display value on input onChange and update autocoplete array in state', () => {
    it('should change value in state that is diplayed in inuput', () => {
      const { enzymeWrapper } = setup();
      const onChangeInput = enzymeWrapper.find('input');
      const instance = enzymeWrapper.instance();
      instance.setAutocompleteDebounce = jest.fn();
      onChangeInput.simulate('change', { target: { value: 'us' } });
      expect(enzymeWrapper.state(['currencyCode'])).toEqual('us');
      expect(instance.setAutocompleteDebounce.mock.calls.length).toBe(1);
    });

    it('should change autocomplete array in state or set error in state', () => {
      const { enzymeWrapper, props } = setup();
      const instance = enzymeWrapper.instance();
      let input = 'u';
      enzymeWrapper.setProps({ ...props, currenciesTable: props.currenciesTable.map(currency => currency.toUpperCase()) })

      enzymeWrapper.setState({ ...initialState, inputError: true, activeItemPosition: 2 });
      instance.setAutocomplete(input);
      expect(enzymeWrapper.state(['autocomplete']).length).toBe(2);
      expect(enzymeWrapper.state(['autocomplete']).map(item => item.toLowerCase())).toEqual(props.currenciesTable.filter(currency => currency.indexOf(input) >= 0));
      expect(enzymeWrapper.state(['inputError'])).toBe(false);
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(0);

      enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD'], inputError: true, activeItemPosition: 2 });
      input = '';
      instance.setAutocomplete(input);
      expect(enzymeWrapper.state(['autocomplete']).length).toBe(0);
      expect(enzymeWrapper.state(['autocomplete'])).toEqual([]);
      expect(enzymeWrapper.state(['inputError'])).toBe(false);
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(0);

      enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD'], inputError: false, activeItemPosition: 2 });
      input = 'gd';
      instance.setAutocomplete(input);
      expect(enzymeWrapper.state(['autocomplete']).length).toBe(0);
      expect(enzymeWrapper.state(['autocomplete'])).toEqual([]);
      expect(enzymeWrapper.state(['inputError'])).toBe(true);
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(0);
    });
  });

  describe('should on key press submit if enter or change activeItemPosition in state on key up/down', () => {
    it('should should submit on enter', () => {
      const { enzymeWrapper } = setup();
      const onKeyPressInput = enzymeWrapper.find('input');
      const instance = enzymeWrapper.instance();
      instance.handleSubmit = jest.fn();

      enzymeWrapper.setState({ ...initialState, currencyCode: 'USD', autocomplete: ['USD'] });
      onKeyPressInput.simulate('keyDown', { keyCode: 13 });
      expect(instance.handleSubmit.mock.calls.length).toBe(1);

      enzymeWrapper.setState({ ...initialState, currencyCode: 'USD', autocomplete: ['USD', 'CHF'], activeItemPosition: 1 });
      onKeyPressInput.simulate('keyDown', { keyCode: 13 });
      expect(enzymeWrapper.state(['currencyCode'])).toEqual('CHF');
      expect(enzymeWrapper.state(['autocomplete'])).toEqual(['CHF']);

      enzymeWrapper.setState({ ...initialState, currencyCode: 'USD', autocomplete: ['CHF', 'USD'], activeItemPosition: 1 });
      onKeyPressInput.simulate('keyDown', { keyCode: 13 });
      expect(enzymeWrapper.state(['currencyCode'])).toEqual('USD');
      expect(enzymeWrapper.state(['autocomplete'])).toEqual(['USD']);

      enzymeWrapper.setState({ ...initialState, currencyCode: 'USD', autocomplete: [], activeItemPosition: 1 });
      onKeyPressInput.simulate('keyDown', { keyCode: 13 });
      expect(enzymeWrapper.state(['currencyCode'])).toEqual('USD');
      expect(enzymeWrapper.state(['autocomplete'])).toEqual([]);
    });

    it('should increase anctiveItemPosition in state keyDown if possible', () => {
      const { enzymeWrapper } = setup();
      const onKeyPressInput = enzymeWrapper.find('input');

      enzymeWrapper.setState({ ...initialState, autocomplete: ['CHF', 'USD', 'AUD'], activeItemPosition: 1 });
      onKeyPressInput.simulate('keyDown', { keyCode: 40 });
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(2);

      enzymeWrapper.setState({ ...initialState, autocomplete: ['CHF', 'USD', 'AUD'], activeItemPosition: 2 });
      onKeyPressInput.simulate('keyDown', { keyCode: 40 });
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(2);
    });

    it('should decrease anctiveItemPosition in state keyUp if possible', () => {
      const { enzymeWrapper } = setup();
      const onKeyPressInput = enzymeWrapper.find('input');

      onKeyPressInput.simulate('keyDown', { keyCode: 38 });
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(0);

      enzymeWrapper.setState({ ...initialState, activeItemPosition: 1 });
      onKeyPressInput.simulate('keyDown', { keyCode: 38 });
      expect(enzymeWrapper.state(['activeItemPosition'])).toBe(0);
    });
  });

  it('should set hover flag on maouse enter on autocomplete list', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'] });
    const onMouseEnterOl = enzymeWrapper.find('ol');

    onMouseEnterOl.simulate('mouseEnter', { preventDefault: () => {} });
    expect(enzymeWrapper.state(['hover'])).toBe(true);
  });

  it('should unset hover flag on mouse leave on autocomplete list', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'], hover: true });
    const onMouseEnterOl = enzymeWrapper.find('ol');

    onMouseEnterOl.simulate('mouseLeave', { preventDefault: () => {} });
    expect(enzymeWrapper.state(['hover'])).toBe(false);
  });

  it('should set hover flag on maouse enter on autocomplete list', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'] });
    const onMouseLeaveOl = enzymeWrapper.find('ol');

    onMouseLeaveOl.simulate('mouseEnter', { preventDefault: () => {} });
    expect(enzymeWrapper.state(['hover'])).toBe(true);
  });

  it('should set chosen (by hover) currency and autocomplete array in state on click', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'] });
    const onClickButton = enzymeWrapper.find('button').first();

    onClickButton.simulate('click', { preventDefault: () => {}, currency: 'USD' });
    expect(enzymeWrapper.state(['currencyCode'])).toEqual('USD');
    expect(enzymeWrapper.state(['autocomplete'])).toEqual(['USD'])
  });

  it('should set activeItemPosition according to li index on mouse enter', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'], activeItemPosition: 2 });
    let onMouseEnterLi = enzymeWrapper.find('li').first();

    onMouseEnterLi.simulate('mouseEnter', { preventDefault: () => {} });
    expect(enzymeWrapper.state(['activeItemPosition'])).toBe(0);

    onMouseEnterLi = enzymeWrapper.find('li').at(1);
    onMouseEnterLi.simulate('mouseEnter', { preventDefault: () => {} });
    expect(enzymeWrapper.state(['activeItemPosition'])).toBe(1);
  });

  it('should render "active" class on autocomplete list button according to activeItemPosition and hover flag', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'], activeItemPosition: 2 });
    
    expect(enzymeWrapper.find('button').first().hasClass('CurrencyButton ')).toBe(true);
    expect(enzymeWrapper.find('button').at(1).hasClass('CurrencyButton ')).toBe(true);
    expect(enzymeWrapper.find('button').at(2).hasClass('CurrencyButton active')).toBe(true);

    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'], activeItemPosition: 1 });
    expect(enzymeWrapper.find('button').first().hasClass('CurrencyButton ')).toBe(true);
    expect(enzymeWrapper.find('button').at(1).hasClass('CurrencyButton active')).toBe(true);
    expect(enzymeWrapper.find('button').at(2).hasClass('CurrencyButton ')).toBe(true);

    enzymeWrapper.setState({ ...initialState, autocomplete: ['USD', 'AUD', 'CAD'], activeItemPosition: 1, hover: true });
    expect(enzymeWrapper.find('button').first().hasClass('CurrencyButton ')).toBe(true);
    expect(enzymeWrapper.find('button').at(1).hasClass('CurrencyButton ')).toBe(true);
    expect(enzymeWrapper.find('button').at(2).hasClass('CurrencyButton ')).toBe(true);
  });
});