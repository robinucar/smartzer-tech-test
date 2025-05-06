import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../lib/theme';
import { UserList } from '../components/UserList/UserList';
import { UserModal } from '../components/UserModal/UserModal';
import { useState } from 'react';
import { ViewToggleButton } from '../components/shared/ViewToggleButton/ViewToggleButton.style';
import { AppWrapper, Controls } from './app.styles';
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

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <main role="main">
        <AppWrapper>
          <Controls>
            <ViewToggleButton>List view</ViewToggleButton>
            <ViewToggleButton>Grid view</ViewToggleButton>
            <ViewToggleButton onClick={() => setModalOpen(true)}>
              Create user
            </ViewToggleButton>
          </Controls>

          <UserList />

          <UserModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            user={null}
          />
        </AppWrapper>
      </main>
    </ThemeProvider>
  );
};

export default App;
