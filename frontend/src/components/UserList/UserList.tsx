import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../lib/api/users';
import { User } from '@shared-types';
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

type UserListProps = {
  users?: User[];
};

export const UserList = ({ users }: UserListProps) => {
  const {
    data: fetchedUsers,
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: !users,
  });

  const dataToRender = users ?? fetchedUsers;

  if (isLoading) return <p>Loading users...</p>;
  if (isError || !dataToRender) return <p>Failed to load users.</p>;

  return (
    <TableWrapper>
      <Table aria-label="User list">
        <Thead>
          <Tr>
            <Th scope="col" aria-hidden="true"></Th>
            <Th scope="col">Name</Th>
            <Th scope="col">Date of Birth</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataToRender.map((user) => (
            <Tr key={user.id}>
              <Td>
                <EyeButton
                  aria-label={`View ${user.firstName} ${user.lastName}`}
                >
                  👁
                </EyeButton>
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
  );
};
