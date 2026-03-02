import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card hover:scale-105 transition-transform duration-300"
      whileTap={{ scale: 0.95 }}
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-[#0A3D62] dark:text-[#74B9FF]" />
      <span className="text-sm font-medium text-[#0A3D62] dark:text-[#F4F9FF]">
        {currentLang === 'es' ? 'ES' : 'EN'}
      </span>
    </motion.button>
  );
}