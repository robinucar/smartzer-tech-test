import styled from 'styled-components';

export const ViewToggleButton = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: 1px solid black;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;
