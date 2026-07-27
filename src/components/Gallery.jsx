import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Loader2 } from 'lucide-react';
import Modal from './Modal';

export default function Gallery() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('minimalism');
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [orientation, setOrientation] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [empty, setEmpty] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (reset = false) => {
    setLoading(true);
    setError(null);
    setEmpty(false);

    try {
      const orientationParam = orientation ? `&orientation=${orientation}` : '';
      const currentPage = reset ? 1 : page;
      
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}${orientationParam}&per_page=12&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
      );
      
      if (!res.ok) throw new Error(t('error_fetch'));
      
      const data = await res.json();
      
      if (data.results.length === 0 && currentPage === 1) {
        setEmpty(true);
        setImages([]);
      } else {
        setImages(prev => reset ? data.results : [...prev, ...data.results]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchImages(true);
  }, [query, orientation]);

  useEffect(() => {
    if (page > 1) fetchImages(false);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) setQuery(searchInput);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full md:w-1/2">
          <Search className="absolute left-0 top-2.5 text-zinc-400" size={20} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-8 py-2 bg-transparent border-b border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
          />
        </form>

        <select 
          value={orientation} 
          onChange={(e) => setOrientation(e.target.value)}
          className="w-full md:w-auto bg-transparent border-b border-zinc-200 dark:border-zinc-800 py-2 focus:outline-none cursor-pointer"
        >
          <option value="">{t('all_formats')}</option>
          <option value="landscape">{t('landscape')}</option>
          <option value="portrait">{t('portrait')}</option>
          <option value="squarish">{t('squarish')}</option>
        </select>
      </div>

      {error && <div className="text-red-500 py-10 text-center">{error}</div>}
      {empty && <div className="text-zinc-500 py-10 text-center font-light">{t('no_results')} "{query}".</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="group relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900 cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description || 'Unsplash image'}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center pb-12">
        {loading ? (
          <Loader2 className="animate-spin text-zinc-400" size={32} />
        ) : (
          images.length > 0 && !empty && (
            <button 
              onClick={() => setPage(p => p + 1)}
              className="text-sm border-b border-zinc-900 dark:border-zinc-100 pb-1 hover:opacity-60 transition-opacity"
            >
              {t('load_more')}
            </button>
          )
        )}
      </div>

      <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}