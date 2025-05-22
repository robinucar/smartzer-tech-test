import { useState, useEffect } from 'react';
import { User } from '@shared-types';
import { UserModal } from '../UserModal/UserModal';
import { ConfirmDialog } from '../shared/ConfirmDialog/ConfirmDialog';
import { ErrorMessage } from '../shared/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../shared/SuccessMessage/SuccessMessage';
import { useUser } from '../../hooks/useUser';
import { sortUsersByName, capitalize } from '../../utils/userUtils';
import { Pagination } from '../shared/Pagination/Pagination';

interface UserListProps {
  users: User[];
}

const USERS_PER_PAGE = 9;

export const UserList = ({ users }: UserListProps) => {
  const { deleteUser: deleteUserById } = useUser();

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const stored = localStorage.getItem('listPage');
    return stored ? parseInt(stored, 10) : 1;
  });
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);

  const sortedUsers = sortUsersByName(users);
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);

  useEffect(() => {
    if (deleteSuccess) {
      const timeout = setTimeout(() => setDeleteSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    setVisibleUsers(sortedUsers.slice(startIndex, endIndex));
    localStorage.setItem('listPage', String(currentPage));
  }, [currentPage, sortedUsers]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (pendingDelete) {
      try {
        await deleteUserById(pendingDelete);
        setDeleteError(null);
        setDeleteSuccess(true);
      } catch {
        setDeleteError('Failed to delete user');
      }
      setPendingDelete(null);
    }
  };

  return (
    <>
      {deleteError && <ErrorMessage message={deleteError} />}
      {deleteSuccess && <SuccessMessage message="User deleted successfully!" />}

      <div className="overflow-x-auto mt-4">
        <table
          className="min-w-full divide-y divide-gray-200 bg-white border border-gray-300 rounded-lg shadow-sm"
          aria-label="User list"
        >
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Date of Birth
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visibleUsers.map((user) => {
              const isViewing = selectedUser?.id === user.id && isModalOpen;
              return (
                <tr key={user.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      aria-label="View user"
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      <img
                        src={
                          isViewing
                            ? '/icons/view-off.svg'
                            : '/icons/view-outline.svg'
                        }
                        alt=""
                        width={20}
                        height={20}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {capitalize(user.firstName)} {capitalize(user.lastName)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {user.dob}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setPendingDelete(String(user.id))}
                      aria-label="Delete user"
                      className="p-1 border border-red-600 rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    >
                      <img
                        src="/icons/delete-outline.svg"
                        alt=""
                        width={20}
                        height={20}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {pendingDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </>
  );
};
