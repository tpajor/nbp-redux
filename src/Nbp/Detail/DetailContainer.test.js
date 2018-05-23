import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DetailContainer } from './DetailContainer';
import { detailViewData } from '../../__mockData__/mockedData';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    signInOrOut: jest.fn(),
    getInputedNumberOfLastRates: jest.fn(),
    detailViewData: detailViewData
  };
  const enzymeWrapper = shallow(<DetailContainer {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('DetailContainer component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('ReactLiveClock').length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(2);
    expect(enzymeWrapper.find('div').first().hasClass('col-8 DetailView')).toBe(true);
    expect(enzymeWrapper.find('div').last().hasClass('Chart')).toBe(true);
    
    expect(enzymeWrapper.find('Link').length).toBe(1);
    expect(enzymeWrapper.find('Link').hasClass('btn btn-primary SignButton')).toBe(true);

    expect(enzymeWrapper.find('Input').length).toBe(1);
    expect(enzymeWrapper.find('Input').props().currencyCodeToViewInDetail).toEqual(detailViewData.currencyCodeToViewInDetail);
    expect(typeof enzymeWrapper.find('Input').props().getInputedNumberOfLastRates).toBe('function');
    expect(enzymeWrapper.find('Input').props().detailsInputError).toEqual(detailViewData.detailsInputError);
    expect(enzymeWrapper.find('Input').props().detailsInputErrorMessage).toEqual(detailViewData.detailsInputErrorMessage);

    expect(enzymeWrapper.find('Chart').length).toBe(1);
    expect(enzymeWrapper.find('Chart').props().dataToPlot).toEqual(detailViewData.lastRates);
    enzymeWrapper.setState({ contWidth: 100 });
    expect(enzymeWrapper.find('Chart').props().contWidth).toEqual(100);
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    
    expect(enzymeWrapper).toMatchSnapshot();
  });

  it('should set ContWidth in state', () => {
    const { props } = setup();
    const options = new ReactRouterEnzymeContext();
    const enzymeWrapper = mount(<DetailContainer {...props} />, options.get(), document.body, window );
    const instance = enzymeWrapper.instance();
    expect(enzymeWrapper.state(['contWidth'])).toEqual(240);
    const chart = document.createElement('Chart');
    chart.id = 'Chart';
    Object.defineProperty(chart, 'clientWidth', { value: 500 });
    document.body.appendChild(chart);
    instance.setWidth();
    expect(enzymeWrapper.state(['contWidth'])).toEqual(400);
  });

  it('should add event listener on window resize on component mount and delete it after dismounting', () => {
    global.window.addEventListener = jest.fn();
    const { enzymeWrapper } = setup();
    const instance = enzymeWrapper.instance();
    expect(global.window.addEventListener).toHaveBeenCalled();
    console.log(global.window.addEventListener);
    //expect(global.window.addEventListener).toHaveBeenLastCalledWith('resize', setWidth);
  });
});