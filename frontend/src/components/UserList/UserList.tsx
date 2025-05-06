import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser } from '../../lib/api/users';
import { User } from '@shared-types';
import { UserModal } from '../UserModal/UserModal';
import { ConfirmDialog } from '../shared/ConfirmDialog/ConfirmDialog';
import { ErrorMessage } from '../shared/ErrorMessage/ErrorMessage';
import { SuccessMessage } from '../shared/SuccessMessage/SuccessMessage';
import { Loading } from '../shared/Loading/Loading';
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

export const UserList = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setDeleteError(null);
      setDeleteSuccess(true);
    },
    onError: () => {
      setDeleteError('Failed to delete user');
    },
  });

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

  const handleConfirmDelete = () => {
    if (pendingDelete) {
      deleteMutation.mutate(pendingDelete);
      setPendingDelete(null);
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorMessage message="Failed to load users." />;

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
            {data.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <EyeButton onClick={() => handleOpenModal(user)}>👁</EyeButton>
                </Td>
                <Td>
                  {user.firstName} {user.lastName}
                </Td>
                <Td>{user.dob}</Td>
                <Td>
                  <button onClick={() => setPendingDelete(String(user.id))}>
                    🗑
                  </button>
                </Td>
              </Tr>
            ))}
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
