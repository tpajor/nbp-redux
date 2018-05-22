import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainViewConnected, { MainView } from './MainView';
import configureMockStore from 'redux-mock-store';
import { initialState, searchViewData, detailViewData } from '../__mockData__/mockedData'

const mockStore = configureMockStore();

const store = mockStore(initialState);

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const enzymeWrapper = shallow(<MainView store={store} />);

  return enzymeWrapper;
};

describe('MainView component', () => {
  it('should render self and subcomponents with their props', () => {
    const enzymeWrapper = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(1);
    expect(enzymeWrapper.find('div').hasClass('row MainView')).toBe(true);

    enzymeWrapper.setProps({searchViewData, detailViewData});

    expect(enzymeWrapper.find('Connect(DetailContainer)').length).toBe(1);
    expect(enzymeWrapper.find('Connect(DetailContainer)').props().detailViewData).toEqual(detailViewData);
    
    expect(enzymeWrapper.find('Connect(Component)').length).toBe(1);
    expect(enzymeWrapper.find('Connect(Component)').props().searchViewData).toEqual(searchViewData);
  });

  it('should render correctly', () => {
    const enzymeWrapper = setup();

    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should map redux state to component props', () => {
    const enzymeWrapper = shallow(<MainViewConnected store={store} />);

    expect(enzymeWrapper.props().searchViewData).toEqual(searchViewData);
    expect(enzymeWrapper.props().detailViewData).toEqual(detailViewData);
  });
});