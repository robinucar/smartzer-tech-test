import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const Table = styled.table.attrs({
  role: 'table',
})<React.TableHTMLAttributes<HTMLTableElement>>`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Thead = styled.thead<
  React.HTMLAttributes<HTMLTableSectionElement>
>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Tbody = styled.tbody<
  React.HTMLAttributes<HTMLTableSectionElement>
>``;

export const Tr = styled.tr<React.HTMLAttributes<HTMLTableRowElement>>`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

export const Th = styled.th<React.ThHTMLAttributes<HTMLTableCellElement>>`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: left;
`;

export const Td = styled.td<React.TdHTMLAttributes<HTMLTableCellElement>>`
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const EyeButton = styled.button.attrs({
  type: 'button',
})<React.ButtonHTMLAttributes<HTMLButtonElement>>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
