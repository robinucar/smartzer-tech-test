import { FC, useState, useEffect } from 'react';
import { User } from '@shared-types';
import { sortUsersByName, capitalize } from '../../utils/userUtils';

interface UserGridViewProps {
  users: User[];
  onImageClick: (user: User) => void;
}

const USERS_PER_PAGE = 9;

export const UserGridView: FC<UserGridViewProps> = ({
  users,
  onImageClick,
}) => {
  const sortedUsers = sortUsersByName(users);

  const [currentPage, setCurrentPage] = useState(() => {
    const stored = localStorage.getItem('gridPage');
    return stored ? parseInt(stored, 10) : 1;
  });

  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);

  useEffect(() => {
    if (sortedUsers.length === 0) return;
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    setVisibleUsers(sortedUsers.slice(startIndex, endIndex));
    localStorage.setItem('gridPage', String(currentPage));
  }, [currentPage, sortedUsers]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [sortedUsers, totalPages, currentPage]);

  return (
    <>
      <div
        role="region"
        aria-label="User grid view"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {visibleUsers.length > 0 ? (
          visibleUsers.map((user) => {
            const name = `${capitalize(user.firstName)} ${capitalize(
              user.lastName,
            )}`;
            return (
              <div
                key={user.id}
                tabIndex={0}
                role="button"
                aria-label={`View profile image of ${name}`}
                onClick={() => onImageClick(user)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onImageClick(user);
                }}
                className="cursor-pointer bg-white shadow-sm border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                <img
                  src={user.imageUrl}
                  alt={`Profile of ${name}`}
                  className="w-24 h-24 rounded-md object-cover mb-3 border border-gray-300"
                />
                <span className="text-sm font-medium text-gray-800">
                  {name}
                </span>
              </div>
            );
          })
        ) : (
          <p role="status" aria-live="polite" className="text-gray-600">
            Loading users...
          </p>
        )}
      </div>

      {totalPages > 0 && (
        <nav
          role="navigation"
          aria-label="Pagination controls"
          className="flex items-center justify-center gap-4 mt-8"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
          >
            Previous
          </button>

          <span className="text-sm text-gray-800" aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
};
