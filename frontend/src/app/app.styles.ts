import styled from 'styled-components';
export const AppWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;
