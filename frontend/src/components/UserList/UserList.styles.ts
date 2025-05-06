import styled from 'styled-components';

export const List = styled.ul.attrs({})<React.HTMLAttributes<HTMLUListElement>>`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li.attrs({})<
  React.LiHTMLAttributes<HTMLLIElement>
>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray || '#ccc'};
`;

export const UserName = styled.h2.attrs({})<
  React.HTMLAttributes<HTMLHeadingElement>
>`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

export const UserDob = styled.p.attrs({})<
  React.HTMLAttributes<HTMLParagraphElement>
>`
  margin: 0;
  font-size: 1rem;
`;
