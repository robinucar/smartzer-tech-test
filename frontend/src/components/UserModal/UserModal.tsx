import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from 'react';
import { User } from '@shared-types';

import { SuccessMessage } from '../shared/SuccessMessage/SuccessMessage';
import { ImagePreviewBlock } from './ImagePreviewBlock';
import { UserFormFields } from './UserFormFields';
import { useUser } from '../../hooks/useUser';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserModal = ({ user, isOpen, onClose }: UserModalProps) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUpdated, setIsUpdated] = useState(false);

  const { createUser, updateUser, isCreating, isUpdating, users } = useUser();

  const generateImageUrl = useCallback(
    () => `https://picsum.photos/seed/${Date.now()}/200/200`,
    [],
  );

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
  }, [isOpen, user, generateImageUrl]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'bio' ? value : value,
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
    } else if (
      !user?.id &&
      users.some(
        (u: User) => u.email.toLowerCase() === formData.email?.toLowerCase(),
      )
    ) {
      newErrors.email = 'Email already exists';
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

    if (user?.id) {
      updateUser(String(user.id), payload);
    } else {
      createUser(payload);
    }

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
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      aria-labelledby="user-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 text-xl font-bold text-gray-500 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        >
          ×
        </button>

        <h2 id="user-modal-title" className="text-xl font-semibold mb-4">
          {user?.id ? 'Edit' : 'Add new'} user
        </h2>

        {isUpdated && (
          <SuccessMessage
            message={
              user?.id
                ? 'User updated successfully!'
                : 'User created successfully!'
            }
          />
        )}
        {errors.form && (
          <p role="alert" className="text-red-600 font-medium mb-2">
            {errors.form}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
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
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
            >
              {isUpdated ? 'Close' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isCreating || isUpdating}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              {isCreating || isUpdating ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block" />
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
