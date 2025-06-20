import { FC, useMemo } from 'react';
import { User } from '@shared-types';
import { sortUsersByName, capitalize } from '../../utils/userUtils';
import { Pagination } from '../shared/Pagination/Pagination';
import { usePaginatedQueryParam } from '../../hooks/usePaginatedQueryParam';

interface UserGridViewProps {
  users: User[];
  onImageClick: (user: User) => void;
}

const USERS_PER_PAGE = 9;

export const UserGridView: FC<UserGridViewProps> = ({
  users,
  onImageClick,
}) => {
  const sortedUsers = useMemo(() => sortUsersByName(users), [users]);
  const [currentPage, setCurrentPage] = usePaginatedQueryParam();

  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);

  const safePage = Math.min(Math.max(1, currentPage), totalPages || 1);
  const startIndex = (safePage - 1) * USERS_PER_PAGE;
  const visibleUsers = sortedUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  );

  return (
    <>
      <div
        role="region"
        aria-label="User grid view"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {visibleUsers.length > 0 ? (
          visibleUsers.map((user) => {
            const name = `${capitalize(user.firstName)} ${capitalize(user.lastName)}`;
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
                  alt={name}
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
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};
