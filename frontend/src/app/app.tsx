import { useState } from 'react';
import { ViewToggleButton } from '../components/shared/ViewToggleButton/ViewToggleButton';
import { UserModal } from '../components/UserModal/UserModal';
import { UserList } from '../components/UserList/UserList';
import { UserGridView } from '../components/UserGridView/UserGridView';
import { UserImageModal } from '../components/UserImageModal/UserImageModal';
import { Loading } from '../components/shared/Loading/Loading';
import { ErrorMessage } from '../components/shared/ErrorMessage/ErrorMessage';
import { useUser } from '../hooks/useUser';
import { User } from '@shared-types';
import { UserSearchBar } from '../components/SearchBar/UserSearchBar';

const App = () => {
  const [view, setView] = useState<'list' | 'grid'>(() => {
    const saved = localStorage.getItem('view');
    return saved === 'grid' ? 'grid' : 'list';
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [previewUser, setPreviewUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { users, isLoading, isError } = useUser();

  const handleViewChange = (newView: 'list' | 'grid') => {
    setView(newView);
    localStorage.setItem('view', newView);
  };

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(q) ||
      user.lastName.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });

  return (
    <main
      role="main"
      className="min-h-screen bg-white text-gray-900 p-4 sm:p-6 md:p-8"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* View Toggle Controls */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-6"
          role="group"
          aria-label="Toggle view controls"
        >
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
        </div>

        {/* Search Bar */}
        <UserSearchBar onSearch={setSearchQuery} />

        {/* Status feedback */}
        {isLoading && <Loading />}
        {isError && <ErrorMessage message="Failed to load users." />}

        {/* User views */}
        {!isLoading &&
          !isError &&
          (view === 'list' ? (
            <UserList users={filteredUsers} />
          ) : (
            <UserGridView users={filteredUsers} onImageClick={setPreviewUser} />
          ))}

        {/* Create/Edit Modal */}
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          user={null}
        />

        {/* Image Preview Modal */}
        {previewUser && (
          <UserImageModal
            imageUrl={previewUser.imageUrl}
            userName={`${previewUser.firstName} ${previewUser.lastName}`}
            onClose={() => setPreviewUser(null)}
          />
        )}
      </div>
    </main>
  );
};

export default App;
