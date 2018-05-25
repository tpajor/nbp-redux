import fetchMock from 'fetch-mock';
import callApi from './apiCaller';
import { searchViewData } from '../__mockData__/mockedData';


describe('apiCaller', () => {
  it('should fetch on endpoint base on data passed to it', () => {
    const endpoint = 'users';
    const method = 'post';
    const body = 'someId';
    const response = searchViewData.cards[0];
    const headers = { 'content-type': 'application/json' };
    const url = `http://localhost:8000/api/${endpoint}`;

    fetchMock.post(url, response)

    callApi(endpoint, method, body).then((res, err) => {
      expect(fetchMock.calls()[0][0]).toEqual(url);
      expect(fetchMock.calls()[0][1].method).toEqual(method);
      expect(fetchMock.calls()[0][1].body).toEqual(JSON.stringify(body));
      expect(fetchMock.calls()[0][1].headers).toEqual(headers);
      expect(res).toEqual(response)
    });
  });

  it('should return error on reject', () => {
    const endpoint = 'cards';
    const method = 'post';
    const body = 'someId';
    const headers = { 'content-type': 'application/json' };
    const url = `http://localhost:8000/api/${endpoint}`;

    fetchMock.post(url, Promise.reject('error'));

    callApi(endpoint, method, body).then((res, err) => {
      expect(fetchMock.calls()[1][0]).toEqual(url);
      expect(fetchMock.calls()[1][1].method).toEqual(method);
      expect(fetchMock.calls()[1][1].body).toEqual(JSON.stringify(body));
      expect(fetchMock.calls()[1][1].headers).toEqual(headers);
      expect(res).toEqual('error')
    });
  });

  it('should get if no method specified', () => {
    const endpoint = 'test';
    const headers = { 'content-type': 'application/json' };
    const url = `http://localhost:8000/api/${endpoint}`;
    const response = searchViewData.cards[0];

    fetchMock.mock(url, response)

    callApi(endpoint).then((res, err) => {
      expect(fetchMock.calls()[2][0]).toEqual(url);
      expect(fetchMock.calls()[2][1].method).toEqual('get');
      expect(fetchMock.calls()[2][1].headers).toEqual(headers);
      expect(res).toEqual(response);
    });
  });

  it('should be in production mode based on process.env', () => {
    const endpoint = 'testPROD';
    const headers = { 'content-type': 'application/json' };
    const url = `https://nbpredux.herokuapp.com/api/${endpoint}`;
    const response = searchViewData.cards[0];
    process.env.REACT_APP_NODE_ENV = 'production'

    fetchMock.mock(url, response)

    callApi(endpoint).then((res, err) => {
      process.env.REACT_APP_NODE_ENV = 'development';
      expect(fetchMock.calls()[3][0]).toEqual(url);
      expect(fetchMock.calls()[3][1].method).toEqual('get');
      expect(fetchMock.calls()[3][1].headers).toEqual(headers);
      expect(res).toEqual(response);
    });
  });
});