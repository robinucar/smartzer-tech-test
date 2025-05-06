import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../lib/api/users';
import { User } from '@shared-types';
import { List, ListItem, UserDob, UserName } from './UserList.styles';
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
    <List aria-label="User list">
      {dataToRender.map((user) => (
        <ListItem key={user.id}>
          <UserName>
            {user.firstName} {user.lastName}
          </UserName>
          <UserDob>Date of Birth: {user.dob}</UserDob>
        </ListItem>
      ))}
    </List>
  );
};
