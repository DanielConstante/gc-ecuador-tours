import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl glass-card hover:scale-105 transition-transform duration-300"
      whileTap={{ scale: 0.95 }}
      aria-label={theme === 'light' ? t('theme.dark') : t('theme.light')}
      title={theme === 'light' ? t('theme.dark') : t('theme.light')}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-[#0A3D62] dark:text-[#74B9FF]" />
        ) : (
          <Sun className="w-5 h-5 text-[#F5A623]" />
        )}
      </motion.div>
    </motion.button>
  );
}