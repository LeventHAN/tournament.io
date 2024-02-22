import { request } from 'graphql-request';

export const graphqlFetcher = (query: TODO) =>
  request(`http://localhost:3000/graphql`, query);

export const createPlayer = (query: TODO) =>
  fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());
