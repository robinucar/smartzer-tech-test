import styled from 'styled-components';

export const Wrapper = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  background-color: #ffe3e3;
  border: 1px solid #ffa8a8;
  color: #c92a2a;
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
  color: #c92a2a;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
`;
