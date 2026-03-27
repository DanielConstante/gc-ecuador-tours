import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/tours', label: t('nav.tours') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/testimonials', label: t('nav.testimonials') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/tours') return location.pathname.startsWith('/tours');
    if (path === '/contact') return location.pathname === '/contact';
    if (path === '/gallery') return location.pathname === '/gallery';
    if (path === '/testimonials') return location.pathname === '/testimonials';
    return false;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2'
            : 'py-4'
        }`}
      >
        <div
          className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'glass-card-strong shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="px-4 md:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A3D62] to-[#1B6CA8] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-lg font-bold text-[#0A3D62] dark:text-[#F4F9FF] leading-tight">
                    GC Ecuador Tours
                  </h1>
                  <p className="text-xs text-[#1B6CA8] dark:text-[#74B9FF]">
                    & Transport
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(link.to)
                        ? 'bg-[#0A3D62]/10 dark:bg-[#74B9FF]/20 text-[#0A3D62] dark:text-[#74B9FF]'
                        : 'text-[#1E272E] dark:text-[#E0E0E0] hover:bg-[#0A3D62]/5 dark:hover:bg-[#74B9FF]/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2.5 rounded-xl glass-card"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 text-[#0A3D62] dark:text-[#F4F9FF]" />
                  ) : (
                    <Menu className="w-5 h-5 text-[#0A3D62] dark:text-[#F4F9FF]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="glass-card-strong rounded-2xl p-4 shadow-xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(link.to)
                        ? 'bg-[#0A3D62]/10 dark:bg-[#74B9FF]/20 text-[#0A3D62] dark:text-[#74B9FF]'
                        : 'text-[#1E272E] dark:text-[#E0E0E0] hover:bg-[#0A3D62]/5 dark:hover:bg-[#74B9FF]/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20 flex items-center justify-center gap-4">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}