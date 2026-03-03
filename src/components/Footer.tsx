import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Facebook, MessageCircle } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';
  const currentYear = new Date().getFullYear();

  const waMessage = encodeURIComponent(
    lang === 'es'
      ? 'Hola! Me gustaría información sobre sus tours en Ecuador.'
      : 'Hello! I would like information about your tours in Ecuador.'
  );

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/tours', label: t('nav.tours') },
    { to: '/#contact', label: t('nav.contact') },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/galopconstanteg',
      label: 'Facebook',
      hoverColor: 'hover:text-[#1877F2]',
    },
    {
      icon: MessageCircle,
      href: `https://wa.me/593984023098?text=${waMessage}`,
      label: 'WhatsApp',
      hoverColor: 'hover:text-[#25D366]',
    },
  ];

  return (
    <footer className="relative mt-20">
      {/* Glassmorphism background */}
      <div className="glass-card-strong border-t border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A3D62] to-[#1B6CA8] flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A3D62] dark:text-[#F4F9FF]">
                   GC Ecuador Tours
                  </h3>
                  <p className="text-sm text-[#1B6CA8] dark:text-[#74B9FF]">
                    & Transport
                  </p>
                </div>
              </div>
              <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-xs">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0A3D62] dark:text-[#74B9FF]">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 hover:text-[#0A3D62] dark:hover:text-[#74B9FF] transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#0A3D62] dark:text-[#74B9FF]">
                {t('footer.contact')}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                  <MapPin className="w-4 h-4 text-[#1B6CA8] dark:text-[#74B9FF]" />
                  {t('contact.locationValue')}
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-[#1B6CA8] dark:text-[#74B9FF] flex-shrink-0" />
                  <a
                    href="tel:+593984023098"
                    className="text-[#1E272E]/70 dark:text-[#E0E0E0]/70 hover:text-[#0A3D62] dark:hover:text-[#74B9FF] transition-colors"
                  >
                    +593 98 402 3098
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-[#1B6CA8] dark:text-[#74B9FF] flex-shrink-0" />
                  <a
                    href="mailto:galoconstante@gmail.com"
                    className="text-[#1E272E]/70 dark:text-[#E0E0E0]/70 hover:text-[#0A3D62] dark:hover:text-[#74B9FF] transition-colors"
                  >
                    galoconstante@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="mt-10 pt-8 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Social Icons */}
              <div className="flex items-center gap-6">
                <span className="text-sm text-[#1E272E]/50 dark:text-[#E0E0E0]/50">
                  {t('footer.followUs')}
                </span>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[#1E272E]/60 dark:text-[#E0E0E0]/60 ${social.hoverColor} transition-all duration-300`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <p className="text-sm text-[#1E272E]/50 dark:text-[#E0E0E0]/50 text-center">
                © {currentYear} GC Ecuador Tours & Transport. {t('footer.rights')}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}