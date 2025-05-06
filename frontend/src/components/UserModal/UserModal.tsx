import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@shared-types';
import { updateUser, createUser } from '../../lib/api/users';
import { SuccessMessage } from '../shared/SuccessMessage/SuccessMessage';
import { ImagePreviewBlock } from './ImagePreviewBlock';
import { UserFormFields } from './UserFormFields';
import {
  Overlay,
  Modal,
  ButtonGroup,
  Button,
  ErrorText,
  CloseIcon,
  Spinner,
  FlexRow,
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

  const generateImageUrl = useCallback(
    () => `https://picsum.photos/seed/${Date.now()}/200/200`,
    []
  );
  const mutation = useMutation({
    mutationFn: (data: Partial<User>) =>
      user?.id ? updateUser(String(user.id), data) : createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setIsUpdated(true);

      setTimeout(() => {
        if (!user?.id) {
          setFormData({
            acceptedTerms: false,
            imageUrl: generateImageUrl(),
          });
        }
        setIsUpdated(false);
        onClose();
      }, 1000);
    },
    onError: () => {
      setErrors({
        form: user?.id
          ? 'Failed to update user. Please try again.'
          : 'Failed to create user. Please try again.',
      });
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        const isoDob = user.dob
          ? new Date(user.dob).toISOString().split('T')[0]
          : '';
        setFormData({ ...user, dob: isoDob });
      } else {
        setFormData({
          acceptedTerms: false,
          imageUrl: generateImageUrl(),
        });
      }
      setErrors({});
      setIsUpdated(false);
    }
  }, [generateImageUrl, isOpen, user]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? checked : name === 'bio' ? value : value.trim(),
    }));
  };

  const handleNextImage = () => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: generateImageUrl(),
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
    if (!validateForm()) return;

    const payload = {
      ...formData,
      dob: formData.dob
        ? new Date(formData.dob).toISOString().split('T')[0]
        : undefined,
      imageUrl: formData.imageUrl || generateImageUrl(),
    };

    mutation.mutate(payload);
  };

  if (!isOpen) return null;

  return (
    <Overlay aria-labelledby="user-modal-title" role="dialog" aria-modal="true">
      <Modal>
        <CloseIcon onClick={onClose} aria-label="Close modal">
          ×
        </CloseIcon>
        <h2 id="user-modal-title">{user?.id ? 'Edit' : 'Add new'} user</h2>

        {isUpdated && (
          <SuccessMessage
            message={
              user?.id
                ? 'User updated successfully!'
                : 'User created successfully!'
            }
          />
        )}
        {errors.form && <ErrorText role="alert">{errors.form}</ErrorText>}

        <form onSubmit={handleSubmit}>
          <FlexRow>
            <UserFormFields
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            >
              <ImagePreviewBlock
                imageUrl={formData.imageUrl}
                onNext={handleNextImage}
              />
            </UserFormFields>
          </FlexRow>

          <ButtonGroup>
            <Button type="button" onClick={onClose}>
              {isUpdated ? 'Close' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : 'Save'}
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </Overlay>
  );
};
