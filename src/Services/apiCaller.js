import 'isomorphic-fetch';

export default function callApi(endpoint, method = 'get', body) {
  let url = `https://nbpredux.herokuapp.com/api/${endpoint}`;
  if (process.env.REACT_APP_NODE_ENV === 'development') { 
    url = `http://localhost:8000/api/${endpoint}`;
  };
  return fetch(url, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json()
    .then(json => ({ 
      json, 
      response 
    }))
  )
  .then(({ json, response }) => {

    return json;
  })
  .then(
    response => response,
    error => error
  );
}
