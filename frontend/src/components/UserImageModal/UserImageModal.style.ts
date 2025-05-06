import styled from 'styled-components';

export const ModalOverlay = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
  padding: 1rem;
`;

export const ModalContent = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  background: #fff;
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
  max-height: 100%;
  overflow: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  outline: none;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

export const ModalHeader = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #222;
  }
`;

export const CloseButton = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background: transparent;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  color: #555;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: #000;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

export const ModalImage = styled.img.attrs({
  role: 'img',
  alt: 'User image',
})<React.ImgHTMLAttributes<HTMLImageElement>>`
  width: 100%;
  height: auto;
  max-height: 80vh;
  margin: 1rem 0;
  object-fit: contain;
  border-radius: 4px;
`;

export const ModalFooter = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const DownloadButton = styled.button<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>`
  background-color: #000;
  color: #fff;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #333;
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`;

export const MetaText = styled.p<React.HTMLAttributes<HTMLParagraphElement>>`
  font-size: 0.9rem;
  color: #555;
  margin: 0;
`;
