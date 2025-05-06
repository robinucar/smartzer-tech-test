import styled from 'styled-components';

export const Wrapper = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  background-color: #e6ffed;
  border: 1px solid #b2f2bb;
  color: #2f8132;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  position: relative;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #2f8132;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
`;
