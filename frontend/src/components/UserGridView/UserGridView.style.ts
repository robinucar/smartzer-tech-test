import styled from 'styled-components';

export const GridWrapper = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  justify-items: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const UserCard = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary || '#000'};
    outline-offset: 4px;
  }
`;

export const ProfileImage = styled.img.attrs({
  role: 'img',
  alt: 'User Profile Image',
})<React.ImgHTMLAttributes<HTMLImageElement>>`
  width: 100%;
  max-width: 160px;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const UserName = styled.span<React.HTMLAttributes<HTMLSpanElement>>`
  margin-top: 0.5rem;
  font-weight: 500;
  text-align: center;
`;

export const PaginationWrapper = styled.div<
  React.HTMLAttributes<HTMLDivElement>
>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const PaginationButton = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
