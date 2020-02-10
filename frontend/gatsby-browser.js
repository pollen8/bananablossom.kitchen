/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';

import { StateProvider } from "./src/context/cartContext"
import { client } from './src/context/apollo';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#0070f3',
  },
}


export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <StateProvider>{element}</StateProvider>
    </ThemeProvider>
  </ApolloProvider>

)