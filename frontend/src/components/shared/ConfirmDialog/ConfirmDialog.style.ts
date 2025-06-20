import styled from 'styled-components';
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Dialog = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

export const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
`;
