import { FC, ChangeEvent, ReactNode } from 'react';
import { User } from '@shared-types';
import { FormField } from './FormField/FormField';

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
    <FormField
      id="firstName"
      label="First Name"
      value={formData.firstName}
      onChange={handleChange}
      error={errors.firstName}
    >
      <p className="mt-1 text-xs text-gray-500">
        Letters, spaces, hyphens (-), and apostrophes (') allowed
      </p>
    </FormField>

    {/* Last Name */}
    <FormField
      id="lastName"
      label="Last Name"
      value={formData.lastName}
      onChange={handleChange}
      error={errors.lastName}
    >
      <p className="mt-1 text-xs text-gray-500">
        Letters, spaces, hyphens (-), and apostrophes (') allowed
      </p>
    </FormField>

    {/* Email */}
    <FormField
      id="email"
      label="Email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      error={errors.email}
    />

    {/* Bio + Profile Image / Children */}
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="flex-1">
        <FormField
          id="bio"
          label="Bio"
          type="textarea"
          value={formData.bio}
          onChange={handleChange}
          error={errors.bio}
          optional
        />
      </div>
      {children && (
        <div className="flex-1 mt-4 lg:mt-0 lg:ml-12">{children}</div>
      )}
    </div>

    {/* DOB & Terms */}
    <div className="flex flex-col lg:flex-row gap-4 items-start">
      <div className="flex-1">
        <FormField
          id="dob"
          label="DOB"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
        />
      </div>

      <div className="flex-1 mt-4 lg:mt-0 lg:ml-12">
        <FormField
          id="acceptedTerms"
          label="Accept T&Cs"
          type="checkbox"
          value={formData.acceptedTerms}
          onChange={handleChange}
          error={errors.acceptedTerms}
        />
      </div>
    </div>
  </div>
);
