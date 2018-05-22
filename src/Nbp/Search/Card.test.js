import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './Card';
import { searchViewData } from '../../__mockData__/mockedData'


Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    cardData: searchViewData.temporaryCard,
    isTemporary: true,
    userSignedIn: searchViewData.userSignedIn,
    signedIn: searchViewData.signedIn,
    cards: searchViewData.cards,
    addCard: jest.fn(),
    deleteCard: jest.fn(),
    showDetails: jest.fn(),
  }

  const enzymeWrapper = shallow(<Card {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('Card component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(7);
    expect(enzymeWrapper.find('div').first().hasClass('Card')).toBe(true);
    expect(enzymeWrapper.find('div').at(1).hasClass('row CardMainContainer')).toBe(true);
    expect(enzymeWrapper.find('div').at(2).hasClass('col-4 CardMainCell Left')).toBe(true);
    expect(enzymeWrapper.find('div').at(3).hasClass('col-4 CardMainCell Mid')).toBe(true);
    expect(enzymeWrapper.find('div').at(4).hasClass('col-4 CardMainCell Right')).toBe(true);
    expect(enzymeWrapper.find('div').at(5).hasClass('CardNameCell')).toBe(true);
    expect(enzymeWrapper.find('div').last().hasClass('DoubleButton')).toBe(true);

    expect(enzymeWrapper.find('p').length).toBe(4);
    expect(enzymeWrapper.find('p').first().hasClass('CardMainCellText')).toBe(true);
    expect(enzymeWrapper.find('p').at(1).hasClass('CardMainCellText')).toBe(true);
    expect(enzymeWrapper.find('p').at(2).hasClass('CardMainCellText')).toBe(true);

    expect(enzymeWrapper.find('button').length).toBe(2);
    expect(enzymeWrapper.find('button').first().hasClass('SaveButton')).toBe(true);
    expect(enzymeWrapper.find('button').last().hasClass('HalfCardButton')).toBe(true);
    enzymeWrapper.setProps({ ...props, isTemporary: false });
    expect(enzymeWrapper.find('button').length).toBe(2);
    expect(enzymeWrapper.find('button').first().hasClass('DeleteCardButton')).toBe(true);
    expect(enzymeWrapper.find('button').last().hasClass('CardButton')).toBe(true);
    enzymeWrapper.setProps({ ...props });
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should call deleteCard props function when the right buuton is clicked', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.setProps({ ...props, isTemporary: false })
    const deleteButton = enzymeWrapper.find('button').first();
    deleteButton.simulate('click');
    expect(props.deleteCard.mock.calls.length).toBe(1);
  });

  it('should call showDetails props function when the right buuton is clicked', () => {
    const { enzymeWrapper, props } = setup();
    let showDetailsButton = enzymeWrapper.find('button').last();
    showDetailsButton.simulate('click');
    expect(props.showDetails.mock.calls.length).toBe(1);

    enzymeWrapper.setProps({ ...props, isTemporary: false })
    showDetailsButton = enzymeWrapper.find('button').last();
    showDetailsButton.simulate('click');
    expect(props.showDetails.mock.calls.length).toBe(2);
  });

  it('should call addCard props function when the right buuton is clicked', () => {
    const { enzymeWrapper, props } = setup();
    const addButton = enzymeWrapper.find('button').first();
    addButton.simulate('click');
    expect(props.addCard.mock.calls.length).toBe(1);
  });
});
