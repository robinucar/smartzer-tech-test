import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../lib/api/users';
import { User } from '@shared-types';
import { UserModal } from '../UserModal/UserModal';
import { ErrorMessage } from '../shared/ErrorMessage/ErrorMessage';
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
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  if (isLoading) return <Loading />;
  if (isError || !data) return <ErrorMessage message="Failed to load users." />;

  return (
    <>
      <TableWrapper>
        <Table aria-label="User list">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Date of Birth</Th>
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
    </>
  );
};
