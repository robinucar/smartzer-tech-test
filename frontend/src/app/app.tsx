import { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../lib/theme';
import { AppWrapper, Controls } from './app.styles';
import { ViewToggleButton } from '../components/shared/ViewToggleButton/ViewToggleButton.style';
import { UserModal } from '../components/UserModal/UserModal';
import { UserList } from '../components/UserList/UserList';
import { UserGridView } from '../components/UserGridView/UserGridView';
import { UserImageModal } from '../components/UserImageModal/UserImageModal';
import { Loading } from '../components/shared/Loading/Loading';
import { ErrorMessage } from '../components/shared/ErrorMessage/ErrorMessage';
import { useUser } from '../hooks/useUser';
import { User } from '@shared-types';

const App = () => {
  const [view, setView] = useState<'list' | 'grid'>(() => {
    const saved = localStorage.getItem('view');
    return saved === 'grid' ? 'grid' : 'list';
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [previewUser, setPreviewUser] = useState<User | null>(null);

  const { users, isLoading, isError } = useUser();

  const handleViewChange = (newView: 'list' | 'grid') => {
    setView(newView);
    localStorage.setItem('view', newView);
  };

  return (
    <ThemeProvider theme={theme}>
      <main role="main">
        <AppWrapper>
          <div className="text-red-500">
            This is a Tailwind test div with red text.
          </div>
          <Controls>
            <ViewToggleButton
              onClick={() => handleViewChange('list')}
              selected={view === 'list'}
              aria-pressed={view === 'list'}
            >
              List view
            </ViewToggleButton>

            <ViewToggleButton
              onClick={() => handleViewChange('grid')}
              selected={view === 'grid'}
              aria-pressed={view === 'grid'}
            >
              Grid view
            </ViewToggleButton>

            <ViewToggleButton onClick={() => setModalOpen(true)}>
              Create user
            </ViewToggleButton>
          </Controls>

          {isLoading && <Loading />}
          {isError && <ErrorMessage message="Failed to load users." />}

          {!isLoading &&
            !isError &&
            (view === 'list' ? (
              <UserList users={users} />
            ) : (
              <UserGridView users={users} onImageClick={setPreviewUser} />
            ))}

          <UserModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            user={null}
          />

          {previewUser && (
            <UserImageModal
              imageUrl={previewUser.imageUrl}
              userName={`${previewUser.firstName} ${previewUser.lastName}`}
              onClose={() => setPreviewUser(null)}
            />
          )}
        </AppWrapper>
      </main>
    </ThemeProvider>
  );
};

export default App;
