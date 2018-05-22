import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardList from './CardList';
import { searchViewData } from '../../__mockData__/mockedData';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    cards: searchViewData.cards,
    signedIn: searchViewData.signedIn,
    userSignedIn: searchViewData.userSignedIn,
    deleteCard: jest.fn(),
    showDetails: jest.fn(),
  };

  const enzymeWrapper = shallow(<CardList {...props} />);

  return enzymeWrapper;
};

describe('CardList component', () => {
  it('should render self and subcomponents with their props', () => {
    const enzymeWrapper = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(1);

    expect(enzymeWrapper.find('Card').length).toEqual(searchViewData.cards.length);
    expect(enzymeWrapper.find('Card').first().props().signedIn).toEqual(searchViewData.signedIn);
    expect(enzymeWrapper.find('Card').first().props().userSignedIn).toEqual(searchViewData.userSignedIn);
    expect(enzymeWrapper.find('Card').first().props().isTemporary).toBe(false);
    expect(enzymeWrapper.find('Card').first().props().cardData).toEqual(searchViewData.cards[1]);
    expect(enzymeWrapper.find('Card').first().props().cards).toEqual(searchViewData.cards);
    expect(typeof enzymeWrapper.find('Card').first().props().deleteCard).toBe('function');
    expect(typeof enzymeWrapper.find('Card').first().props().showDetails).toBe('function');
  });

  it('should render correctly', () => {
    const enzymeWrapper = setup();
    expect(enzymeWrapper).toMatchSnapshot();
  });
});