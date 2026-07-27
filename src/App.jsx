import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, LogOut } from 'lucide-react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './components/Login';
import Gallery from './components/Gallery';

export default function App() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'bg' ? 'en' : 'bg';
    i18n.changeLanguage(nextLang);
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="relative min-h-screen">
        <button onClick={toggleLanguage} className="absolute top-6 right-6 p-2 uppercase text-sm font-medium hover:opacity-70">
          {i18n.language}
        </button>
        <Login />
      </div>
    );
  }

  const displayName = user.displayName || user.email.split('@')[0];

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 pt-8 font-sans">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center mb-16">
        <h1 className="text-xl font-medium tracking-tight">Gallery.</h1>
        <div className="flex items-center gap-6">
          <span className="text-sm hidden sm:inline-block text-zinc-500">{t('hello')}, {displayName}</span>
          <button onClick={toggleLanguage} className="hover:opacity-70 transition-opacity uppercase text-sm font-medium">
            {i18n.language}
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="hover:opacity-70 transition-opacity">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => signOut(auth)} className="hover:opacity-70 transition-opacity">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main>
        <Gallery />
      </main>
    </div>
  );
}