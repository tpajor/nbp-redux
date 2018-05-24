import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chart from './Chart';
import { detailViewData } from '../../__mockData__/mockedData';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    dataToPlot: detailViewData.lastRates,
    constWidth: 400,
  };

  const enzymeWrapper = shallow(<Chart {...props} />);

  return {
    enzymeWrapper,
    props
  };
};

describe('Chart component', () => {
  it('should render self and subcomponents with their props', () => {
    const { enzymeWrapper, props } = setup();

    expect(enzymeWrapper.length).toBe(1);

    expect(enzymeWrapper.find('div').length).toBe(1);

    expect(enzymeWrapper.find('h3').length).toBe(1);
    expect(enzymeWrapper.find('h3').hasClass('text-center')).toBe(true);
    expect(enzymeWrapper.find('h3').text()).toEqual('2 ostatnie kursy');
    enzymeWrapper.setProps({ ...props, dataToPlot: props.dataToPlot.concat(detailViewData.lastRates[0]) });
    expect(enzymeWrapper.find('h3').text()).toEqual('3 ostatnie kursy');
    enzymeWrapper.setProps({ ...props, dataToPlot: props.dataToPlot.concat(detailViewData.lastRates) });
    expect(enzymeWrapper.find('h3').text()).toEqual('4 ostatnie kursy');
    enzymeWrapper.setProps({ ...props, dataToPlot: props.dataToPlot.concat(detailViewData.lastRates).concat(detailViewData.lastRates[0]) });
    expect(enzymeWrapper.find('h3').text()).toEqual('5 ostatnich kursów');
    enzymeWrapper.setProps({ ...props, dataToPlot: [props.dataToPlot[0]] });
    expect(enzymeWrapper.find('h3').text()).toEqual('Najnowszy kurs');
    enzymeWrapper.setProps({ ...props, dataToPlot: null });
    expect(enzymeWrapper.find('h3').text()).toEqual('');
    enzymeWrapper.setProps({ ...props });

    expect(enzymeWrapper.find('LineChart').length).toBe(1);
    expect(enzymeWrapper.find('LineChart').props().data).toEqual(detailViewData.lastRates);

    expect(enzymeWrapper.find('XAxis').length).toBe(1);

    expect(enzymeWrapper.find('YAxis').length).toBe(1);

    expect(enzymeWrapper.find('CartesianGrid').length).toBe(1);
    
    expect(enzymeWrapper.find('Tooltip').length).toBe(1);

    expect(enzymeWrapper.find('Legend').length).toBe(1);

    expect(enzymeWrapper.find('Line').length).toBe(2);
    expect(enzymeWrapper.find('Line').first().props().dataKey).toEqual('kupno');
    expect(enzymeWrapper.find('Line').last().props().dataKey).toEqual('sprzedaż');
  });

  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
