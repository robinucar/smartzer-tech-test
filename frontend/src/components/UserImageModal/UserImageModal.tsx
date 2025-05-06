import { FC, useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalImage,
  ModalFooter,
  CloseButton,
  DownloadButton,
  MetaText,
} from './UserImageModal.style';

interface UserImageModalProps {
  imageUrl: string;
  userName: string;
  onClose: () => void;
}

export const UserImageModal: FC<UserImageModalProps> = ({
  imageUrl,
  userName,
  onClose,
}) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      setImageError(false);
    };
    img.onerror = () => setImageError(true);
    img.src = imageUrl;
  }, [imageUrl]);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${userName.replace(/\s+/g, '_')}_profile_image.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl); // Clean up
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <ModalOverlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <ModalContent>
        <ModalHeader>
          <h2 id="image-modal-title">{userName}</h2>
          <CloseButton onClick={onClose} aria-label="Close image modal">
            ×
          </CloseButton>
        </ModalHeader>

        {imageError ? (
          <p role="alert" style={{ padding: '1rem', textAlign: 'center' }}>
            Failed to load image.
          </p>
        ) : (
          <ModalImage
            src={imageUrl}
            alt={`Profile image of ${userName}`}
            style={{ maxWidth: '1000px', maxHeight: '1000px' }}
          />
        )}

        <ModalFooter>
          {imageSize && !imageError && (
            <MetaText>
              Original size: {imageSize.width}px × {imageSize.height}px
            </MetaText>
          )}
          {!imageError && (
            <DownloadButton
              onClick={handleDownload}
              aria-label="Download full quality image"
            >
              Download
            </DownloadButton>
          )}
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};
