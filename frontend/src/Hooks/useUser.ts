import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, createUser, updateUser, deleteUser } from '../lib/api/users';
import { User } from '@shared-types';

export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
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
    users,
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
