import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { DAppProvider } from '@usedapp/core'

import App from './containers/App';
import { KEYS } from './constants/constants';

import { GlobalStyle } from 'styles/Global';

let SUBGRAPH_URI = KEYS[process.env.REACT_APP_ENV].SUBGRAPH_URI;

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      default: return object.id;
    }
  }
});

const client = new ApolloClient({
  uri: SUBGRAPH_URI,
  cache
});

const config = {
  supportedChains: [KEYS[process.env.REACT_APP_ENV].CHAINID],
  readOnlyChainId: KEYS[process.env.REACT_APP_ENV].CHAINID,
  readOnlyUrls: {
    [KEYS[process.env.REACT_APP_ENV].CHAINID]: KEYS[process.env.REACT_APP_ENV].CHAINRPC
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <DAppProvider config={config}>
      <App SUBGRAPH_URI={SUBGRAPH_URI} />
      <GlobalStyle />
    </DAppProvider>
  </ApolloProvider>,
  document.getElementById('root')
);