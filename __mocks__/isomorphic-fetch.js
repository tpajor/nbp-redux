let __value = '';
const isomorphicFetch = jest.fn().mockImplementation(() => {
  return Promise.resolve(__value);
});

isomorphicFetch.__fetchUsers = value => __value = value;

export default isomorphicFetch;