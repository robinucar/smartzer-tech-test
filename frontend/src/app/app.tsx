import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../lib/theme';
import { UserList } from '../components/UserList/UserList';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const AppWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <main role="main">
      <AppWrapper>
        <UserList />
      </AppWrapper>
    </main>
  </ThemeProvider>
);

export default App;
