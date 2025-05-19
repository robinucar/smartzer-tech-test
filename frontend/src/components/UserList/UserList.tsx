import { useState, useEffect } from 'react';
import { User } from '@shared-types';
import { UserModal } from '../UserModal/UserModal';
import { ConfirmDialog } from '../shared/ConfirmDialog/ConfirmDialog';
import { ErrorMessage } from '../shared/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../shared/SuccessMessage/SuccessMessage';
import { useUser } from '../../hooks/useUser';
import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  EyeButton,
} from './UserList.styles';
import { sortUsersByName, capitalize } from '../../utils/userUtils';

interface UserListProps {
  users: User[];
}

export const UserList = ({ users }: UserListProps) => {
  const { deleteUser: deleteUserById } = useUser();

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  useEffect(() => {
    if (deleteSuccess) {
      const timeout = setTimeout(() => setDeleteSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [deleteSuccess]);

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

      <TableWrapper>
        <Table aria-label="User list">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Date of Birth</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortUsersByName(users).map((user) => {
              const isViewing = selectedUser?.id === user.id && isModalOpen;
              return (
                <Tr key={user.id}>
                  <Td>
                    <EyeButton
                      onClick={() => handleOpenModal(user)}
                      aria-label="View user"
                    >
                      <img
                        src={
                          isViewing
                            ? '/icons/view-off.svg'
                            : '/icons/view-outline.svg'
                        }
                        alt="View user"
                        width={20}
                        height={20}
                      />
                    </EyeButton>
                  </Td>
                  <Td>
                    {capitalize(user.firstName)} {capitalize(user.lastName)}
                  </Td>
                  <Td>{user.dob}</Td>
                  <Td>
                    <button
                      onClick={() => setPendingDelete(String(user.id))}
                      aria-label="Delete user"
                      style={{
                        background: 'none',
                        border: '1px solid',
                        borderRadius: '30%',
                        cursor: 'pointer',
                        color: 'red',
                      }}
                    >
                      <img
                        src="/icons/delete-outline.svg"
                        alt="Delete user"
                        width={20}
                        height={20}
                      />
                    </button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableWrapper>

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
