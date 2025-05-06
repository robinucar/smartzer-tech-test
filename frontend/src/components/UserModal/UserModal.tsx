import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@shared-types';
import { updateUser } from '../../lib/api/users';

import {
  Overlay,
  Modal,
  Field,
  Label,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  FlexRow,
  CheckboxContainer,
  DateInput,
  ErrorText,
  CloseIcon,
  SuccessText,
} from './UserModal.style';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal = ({ user, isOpen, onClose }: UserModalProps) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUpdated, setIsUpdated] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Partial<User>) => updateUser(String(user?.id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsUpdated(true);
    },
    onError: () => {
      setErrors({ form: 'Failed to update user. Please try again.' });
    },
  });

  useEffect(() => {
    if (isOpen && user) {
      const isoDob = user.dob
        ? new Date(user.dob).toISOString().split('T')[0]
        : '';
      setFormData({ ...user, dob: isoDob });
      setErrors({});
    }
  }, [isOpen, user]);

  // Reset success only once when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsUpdated(false);
    }
  }, [isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value.trim(),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.acceptedTerms)
      newErrors.acceptedTerms = 'You must accept T&Cs';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !user) return;
    mutation.mutate(formData);
  };

  if (!isOpen || !user) return null;

  return (
    <Overlay aria-labelledby="user-modal-title">
      <Modal>
        <CloseIcon onClick={onClose} aria-label="Close modal">
          ×
        </CloseIcon>
        <h2 id="user-modal-title">{user.id ? 'Edit' : 'Create'} User</h2>

        {isUpdated && <SuccessText>User updated successfully!</SuccessText>}
        {errors.form && <ErrorText role="alert">{errors.form}</ErrorText>}

        <form onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
            />
            {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
            />
            {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="bio">Bio</Label>
            <TextArea
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
            />
          </Field>

          <FlexRow>
            <div>
              <Label htmlFor="dob">DOB</Label>
              <DateInput
                name="dob"
                type="date"
                value={formData.dob || ''}
                onChange={handleChange}
              />
              {errors.dob && <ErrorText>{errors.dob}</ErrorText>}
            </div>

            <CheckboxContainer htmlFor="acceptedTerms">
              Accept T&Cs
              <input
                id="acceptedTerms"
                type="checkbox"
                name="acceptedTerms"
                checked={formData.acceptedTerms || false}
                onChange={handleChange}
              />
            </CheckboxContainer>
          </FlexRow>

          {errors.acceptedTerms && (
            <ErrorText>{errors.acceptedTerms}</ErrorText>
          )}

          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              {isUpdated ? 'Close' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              Save
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </Overlay>
  );
};
