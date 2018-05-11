import fetch from 'isomorphic-fetch';

export default function callApi(endpoint, method = 'get', body) {
  const port = process.env.PORT || 8000;
  return fetch(`https://nbpredux.herokuapp.com/api/${endpoint}`, {
    headers: { 'content-type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
