import { FC } from 'react';

interface ImagePreviewBlockProps {
  imageUrl?: string;
  onNext: () => void;
}

export const ImagePreviewBlock: FC<ImagePreviewBlockProps> = ({
  imageUrl,
  onNext,
}) => {
  return (
    <div className="mb-6 flex flex-col items-start gap-3">
      <label className="block text-sm font-medium text-gray-700">
        Profile Image
      </label>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview of user avatar"
          className="w-24 h-24 object-cover rounded-md border border-gray-300"
        />
      )}

      <button
        type="button"
        onClick={onNext}
        aria-label="Get a new profile image"
        className="px-4 py-2 mt-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600"
      >
        Next image
      </button>
    </div>
  );
};
