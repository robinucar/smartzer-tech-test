import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, createUser, updateUser, deleteUser } from '../lib/api/users';
import { User } from '@shared-types';

interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
  q: string;
}

export const useUser = (page: number, query: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<UserListResponse>({
    queryKey: ['users', page, query],
    queryFn: () => getUsers({ page, q: query }),
    placeholderData: () => {
      const previous = queryClient.getQueryData<UserListResponse>([
        'users',
        page - 1,
        query,
      ]);
      return (
        previous ?? {
          users: [],
          total: 0,
          page,
          totalPages: 1,
          q: query,
        }
      );
    },
  });

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    users: data?.users ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    totalPages: data?.totalPages ?? 1,
    q: data?.q ?? '',
    isLoading,
    isError,
    createUser: createMutation.mutate,
    updateUser: (id: string, data: Partial<User>) =>
      updateMutation.mutate({ id, data }),
    deleteUser: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
