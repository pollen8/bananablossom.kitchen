import ApolloClient, { HttpLink } from 'apollo-boost';

const config = {
  link: new HttpLink({
    uri: "http://localhost:1337/graphql", // Server URL (must be absolute)
  })
};


export const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});
