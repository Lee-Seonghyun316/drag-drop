import React from 'react';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Basic from './components/Basic';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Basic />
    </ThemeProvider>
  );
}

export default App;
