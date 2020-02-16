import React from 'react';
import { ThemeProvider } from 'styled-components';

import { StateProvider } from './cartContext';
import { theme } from './theme';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <StateProvider>{element}</StateProvider>
  </ThemeProvider>
)

