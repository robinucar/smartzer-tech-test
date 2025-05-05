import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../lib/theme';
import NxWelcome from './nx-welcome';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: Arial, sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const AppWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppWrapper>
        <NxWelcome title="@smartzer-tech-test/frontend" />
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
