import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Modal({ image, onClose }) {
  const { t } = useTranslation();
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-black/90 p-4 sm:p-8 backdrop-blur-sm">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
      >
        <X size={24} />
      </button>
      <div className="max-w-4xl max-h-full flex flex-col items-center">
        <img 
          src={image.urls.regular} 
          alt={image.alt_description}
          className="max-h-[80vh] object-contain shadow-2xl"
        />
        <div className="mt-4 text-center">
          <p className="text-sm font-medium">{image.user.name}</p>
          <a href={image.links.html} target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:underline">
            {t('view_unsplash')}
          </a>
        </div>
      </div>
    </div>
  );
}