import Expo from 'expo';

import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const graphQL_endpoint = 'https://api.graph.cool/simple/v1/cj16d5du8f2zs01183wo9zqap';

const networkInterface = createNetworkInterface({
  uri: graphQL_endpoint,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }

    AsyncStorage.getItem('token')
    .then(
      (encodedToken) => {
        req.options.headers['authorization'] = `Bearer ${encodedToken}`;
        next();
      },
      (failure) => {
        console.error('ERROR: no token', failure);
        next();
      }
    );
  }
}]);

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id,
});
