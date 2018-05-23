import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SearchContainer } from './SearchContainer';
import { searchViewData } from '../../__mockData__/mockedData';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    deleteCard: jest.fn(),
    addCard: jest.fn(),
    showDetails: jest.fn(),
    getCurrency: jest.fn(),
    getCurrenciesTable: jest.fn(),
    searchViewData: searchViewData
  };

  const enzymeWrapper = shallow(<SearchContainer {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('SearchContainer component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(1);
    expect(enzymeWrapper.find('div').hasClass('col-4 SearchView')).toBe(true);

    expect(enzymeWrapper.find('Search').length).toBe(1);
    expect(typeof enzymeWrapper.find('Search').props().getCurrenciesTable).toBe('function');
    expect(typeof enzymeWrapper.find('Search').props().getCurrency).toBe('function');
    expect(enzymeWrapper.find('Search').props().searchError).toEqual(searchViewData.searchError);
    expect(enzymeWrapper.find('Search').props().currenciesTable).toEqual(searchViewData.currenciesTable);
    expect(enzymeWrapper.find('CardList').length).toBe(1);
    expect(typeof enzymeWrapper.find('CardList').props().deleteCard).toBe('function');
    expect(typeof enzymeWrapper.find('CardList').props().showDetails).toBe('function');
    expect(enzymeWrapper.find('CardList').props().cards).toEqual(searchViewData.cards);
    expect(enzymeWrapper.find('CardList').props().signedIn).toEqual(searchViewData.signedIn);
    expect(enzymeWrapper.find('CardList').props().userSignedIn).toEqual(searchViewData.userSignedIn);

    enzymeWrapper.setProps({ ...props, searchViewData: { ...searchViewData, userSignedIn: 'User' } });
    expect(enzymeWrapper.find('h5').length).toBe(1);
    enzymeWrapper.setProps({ ...props, searchViewData: { ...searchViewData, userSignedIn: '' } });
    expect(enzymeWrapper.find('h5').length).toBe(0);
    enzymeWrapper.setProps({ ...props });

    enzymeWrapper.setProps({ ...props, searchViewData: { ...searchViewData, addCardError: true } });
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toEqual(searchViewData.addCardErrorMessage);
    expect(enzymeWrapper.find('p').children('br').length).toBe(1);
    enzymeWrapper.setProps({ ...props, searchViewData: { ...searchViewData, addCardError: false } });
    expect(enzymeWrapper.find('p').length).toBe(0);
    enzymeWrapper.setProps({ ...props });

    enzymeWrapper.setProps({ ...props, searchViewData: { ...searchViewData, temporaryCard: null } });
    expect(enzymeWrapper.find('Card').length).toBe(0);
    enzymeWrapper.setProps({ ...props, searchViewData: { ...searchViewData, temporaryCard: searchViewData.temporaryCard } });
    expect(enzymeWrapper.find('Card').length).toBe(1);
    expect(typeof enzymeWrapper.find('Card').props().addCard).toBe('function');
    expect(typeof enzymeWrapper.find('Card').props().showDetails).toBe('function');
    expect(enzymeWrapper.find('Card').props().cardData).toEqual(searchViewData.temporaryCard);
    expect(enzymeWrapper.find('Card').props().signedIn).toEqual(searchViewData.signedIn);
    expect(enzymeWrapper.find('Card').props().userSignedIn).toEqual(searchViewData.userSignedIn);
    expect(enzymeWrapper.find('Card').props().isTemporary).toBe(true);
    expect(enzymeWrapper.find('Card').props().cards).toEqual(searchViewData.cards);
    });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    
    expect(enzymeWrapper).toMatchSnapshot();
  });
});