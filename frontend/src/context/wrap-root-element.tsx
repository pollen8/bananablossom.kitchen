import React from 'react';
import { ThemeProvider } from 'styled-components';

import { StateProvider } from './cartContext';

const theme = {
  colors: {
    primary: '#0070f3',
  },
}


export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <StateProvider>{element}</StateProvider>
  </ThemeProvider>
)

