import { FC } from 'react';
import { User } from '@shared-types';
import { capitalize } from '../../utils/userUtils';
import { Pagination } from '../shared/Pagination/Pagination';

interface UserGridViewProps {
  users: User[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onImageClick: (user: User) => void;
  isLoading: boolean;
}

export const UserGridView: FC<UserGridViewProps> = ({
  users,
  totalPages,
  currentPage,
  onPageChange,
  onImageClick,
  isLoading,
}) => {
  return (
    <>
      <div
        role="region"
        aria-label="User grid view"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
      >
        {!isLoading && users.length > 0 ? (
          users.map((user) => {
            const name = `${capitalize(user.firstName)} ${capitalize(user.lastName)}`;
            return (
              <button
                key={user.id}
                type="button"
                aria-label={`View profile image of ${name}`}
                onClick={() => onImageClick(user)}
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
              </button>
            );
          })
        ) : isLoading ? (
          <p role="status" aria-live="polite" className="text-gray-600">
            Loading users...
          </p>
        ) : (
          <p role="status" aria-live="polite" className="text-gray-600">
            No users found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};
