import { FC, ChangeEvent, ReactNode } from 'react';
import { User } from '@shared-types';

interface UserFormFieldsProps {
  formData: Partial<User>;
  errors: Record<string, string>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  children?: ReactNode;
}

export const UserFormFields: FC<UserFormFieldsProps> = ({
  formData,
  errors,
  handleChange,
  children,
}) => (
  <div className="space-y-6">
    {/* First Name */}
    <div>
      <label
        htmlFor="firstName"
        className="block text-sm font-medium text-gray-700"
      >
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-2"
      />
      {errors.firstName && (
        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Letters, spaces, hyphens (-), and apostrophes (') allowed
      </p>
    </div>

    {/* Last Name */}
    <div>
      <label
        htmlFor="lastName"
        className="block text-sm font-medium text-gray-700"
      >
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-2"
      />
      {errors.lastName && (
        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
      )}
      <p className="mt-1 text-xs text-gray-500">
        Letters, spaces, hyphens (-), and apostrophes (') allowed
      </p>
    </div>

    {/* Email */}
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        value={formData.email || ''}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-2"
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
      )}
    </div>

    {/* Bio & Children Slot */}
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-2"
          rows={4}
        />
      </div>
      {children}
    </div>

    {/* DOB & Terms */}
    <div className="flex flex-col lg:flex-row gap-4 items-start">
      <div className="flex-1">
        <label
          htmlFor="dob"
          className="block text-sm font-medium text-gray-700"
        >
          DOB
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={formData.dob || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-2"
        />
        {errors.dob && (
          <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
        )}
      </div>

      <label
        htmlFor="acceptedTerms"
        className="flex items-center space-x-2 text-sm font-medium text-gray-700 cursor-pointer mt-6"
      >
        <input
          id="acceptedTerms"
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms || false}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <span>Accept T&amp;Cs</span>
      </label>
    </div>

    {errors.acceptedTerms && (
      <p className="text-sm text-red-600">{errors.acceptedTerms}</p>
    )}
  </div>
);
