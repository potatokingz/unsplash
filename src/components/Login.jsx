import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login() {
  const { t } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-light mb-8 text-center">
          {isRegister ? t('register_title') : t('welcome')}
        </h1>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
            required
          />
          <input
            type="password"
            placeholder={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-colors"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-2 text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            {isRegister ? t('register') : t('login')}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={handleGoogle}
            className="w-full border border-zinc-300 dark:border-zinc-700 py-2 text-sm uppercase tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex justify-center items-center gap-2"
          >
            {t('google')}
          </button>
          
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            {isRegister ? t('have_account') : t('no_account')}
          </button>
        </div>
      </div>
    </div>
  );
}