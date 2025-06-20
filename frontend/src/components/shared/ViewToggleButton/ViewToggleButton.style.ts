import styled from 'styled-components';

interface ViewToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const ViewToggleButton = styled.button<ViewToggleButtonProps>`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid black;
  background-color: ${({ selected }) => (selected ? 'black' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background-color: ${({ selected }) => (selected ? 'black' : '#f0f0f0')};
  }
`;
