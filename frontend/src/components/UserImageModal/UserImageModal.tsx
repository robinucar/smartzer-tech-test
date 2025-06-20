import { FC, useEffect, useState } from 'react';

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

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2
            id="image-modal-title"
            className="text-lg font-semibold text-gray-900"
          >
            {userName}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close image modal"
            className="text-2xl font-bold text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-700"
          >
            ×
          </button>
        </div>

        {imageError ? (
          <p role="alert" className="py-6 text-center text-sm text-red-700">
            Failed to load image.
          </p>
        ) : (
          <img
            src={imageUrl}
            alt={`${userName}'s profile`}
            className="mx-auto max-w-full max-h-[1000px] rounded-md border border-gray-200"
          />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          {imageSize && !imageError && (
            <p className="text-sm text-gray-600">
              Original size: {imageSize.width}px × {imageSize.height}px
            </p>
          )}

          {!imageError && (
            <button
              onClick={handleDownload}
              aria-label="Download full quality image"
              className="self-start sm:self-auto px-4 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
