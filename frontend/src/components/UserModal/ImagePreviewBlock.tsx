import { FC } from 'react';
import { Button, ImagePreview, ImageWrapper, Label } from './UserModal.style';

interface ImagePreviewBlockProps {
  imageUrl?: string;
  onNext: () => void;
}

export const ImagePreviewBlock: FC<ImagePreviewBlockProps> = ({
  imageUrl,
  onNext,
}) => {
  return (
    <ImageWrapper>
      <Label>Profile Image</Label>
      {imageUrl && <ImagePreview src={imageUrl} alt="Preview of user avatar" />}
      <Button
        type="button"
        onClick={onNext}
        aria-label="Get a new profile image"
      >
        Next image
      </Button>
    </ImageWrapper>
  );
};
