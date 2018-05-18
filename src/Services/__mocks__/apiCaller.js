import fetch from 'isomorphic-fetch';

export default function callApi(endpoint, method = 'get', body) {
  const url = `http://localhost:8000/api/${endpoint}`;
  return fetch(url, {
    headers: { 'content-type': 'application/json' },
    method,
    body,
  })
  .then(response => {
    return response;
  });
}
