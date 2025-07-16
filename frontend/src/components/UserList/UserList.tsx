import { useEffect, useState } from 'react';
import { User } from '@shared-types';
import { UserModal } from '../UserModal/UserModal';
import { ConfirmDialog } from '../shared/ConfirmDialog/ConfirmDialog';
import { ErrorMessage } from '../shared/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../shared/SuccessMessage/SuccessMessage';
import { capitalize } from '../../utils/userUtils';
import { Pagination } from '../shared/Pagination/Pagination';

interface UserListProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  deleteUserById: (id: string) => void;
}

export const UserList = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  deleteUserById,
}: UserListProps) => {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!deleteSuccess) return;
    const timeout = setTimeout(() => setDeleteSuccess(false), 3000);
    return () => clearTimeout(timeout);
  }, [deleteSuccess]);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteUserById(pendingDelete);
      setDeleteError(null);
      setDeleteSuccess(true);
    } catch {
      setDeleteError('Failed to delete user');
    }
    setPendingDelete(null);
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
              <th></th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-600">
                  Loading users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => {
                const isViewing = selectedUser?.id === user.id && isModalOpen;
                return (
                  <tr key={user.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setModalOpen(true);
                        }}
                        aria-label="View user"
                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
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
                        type="button"
                        onClick={() => setPendingDelete(String(user.id))}
                        aria-label="Delete user"
                        className="p-1 border border-red-600 rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <img
                          src="/icons/delete-outline.svg"
                          alt="delete user"
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* Modals */}
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedUser(null);
          setModalOpen(false);
        }}
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
