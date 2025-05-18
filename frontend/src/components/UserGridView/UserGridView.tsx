import { FC, useState, useEffect } from 'react';
import { User } from '@shared-types';
import {
  GridWrapper,
  UserCard,
  ProfileImage,
  UserName,
  PaginationWrapper,
  PaginationButton,
} from './UserGridView.style';
import { sortUsersByName, capitalize } from '../../utils/UserUtils';

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
      <GridWrapper role="region" aria-label="User grid view">
        {visibleUsers.length > 0 ? (
          visibleUsers.map((user) => (
            <UserCard
              key={user.id}
              tabIndex={0}
              role="button"
              aria-label={`View profile image of ${capitalize(
                user.firstName,
              )} ${capitalize(user.lastName)}`}
              onClick={() => onImageClick(user)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onImageClick(user);
              }}
            >
              <ProfileImage
                src={user.imageUrl}
                alt={`Profile of ${capitalize(user.firstName)} ${capitalize(
                  user.lastName,
                )}`}
              />
              <UserName>{`${capitalize(user.firstName)} ${capitalize(
                user.lastName,
              )}`}</UserName>
            </UserCard>
          ))
        ) : (
          <p role="status" aria-live="polite">
            Loading users...
          </p>
        )}
      </GridWrapper>

      {totalPages > 0 && (
        <PaginationWrapper role="navigation" aria-label="Pagination controls">
          <PaginationButton
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </PaginationButton>

          <span aria-live="polite">
            Page {currentPage} of {totalPages}
          </span>

          <PaginationButton
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </PaginationButton>
        </PaginationWrapper>
      )}
    </>
  );
};
