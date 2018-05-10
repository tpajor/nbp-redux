import fetch from 'isomorphic-fetch';

const callApi = async (endpoint, method = 'get', body) => {
  return fetch(`localhost:8000/api/${endpoint}`, {
    headers: {'constent-type': 'application/json'},
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    console.log('reject');
    return json;
  })
  .then(
    response => response,
    error => error
  );
};

export default callApi;