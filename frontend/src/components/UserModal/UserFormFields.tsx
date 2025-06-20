import { FC, ChangeEvent, ReactNode } from 'react';
import {
  Field,
  Label,
  Input,
  TextArea,
  DateInput,
  CheckboxContainer,
  ErrorText,
  FlexRow,
  FormFieldsWrapper,
  HelperText,
} from './UserModal.style';
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
  <FormFieldsWrapper>
    <Field>
      <Label htmlFor="firstName">First Name</Label>
      <Input
        name="firstName"
        value={formData.firstName || ''}
        onChange={handleChange}
      />
      {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
      <HelperText>
        Letters, spaces, hyphens (-), and apostrophes (') allowed
      </HelperText>
    </Field>

    <Field>
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        name="lastName"
        value={formData.lastName || ''}
        onChange={handleChange}
      />
      {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
      <HelperText>
        Letters, spaces, hyphens (-), and apostrophes (') allowed
      </HelperText>
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

    <FlexRow>
      <Field style={{ flex: 1 }}>
        <Label htmlFor="bio">Bio</Label>
        <TextArea
          name="bio"
          value={formData.bio || ''}
          onChange={handleChange}
        />
      </Field>
      {children}
    </FlexRow>

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

    {errors.acceptedTerms && <ErrorText>{errors.acceptedTerms}</ErrorText>}
  </FormFieldsWrapper>
);
