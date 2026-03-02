import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { 
  MapPin, 
  Clock, 
  Car, 
  Compass, 
  Plane, 
  Mountain,
  Users,
  Calendar,
  Award,
  Shield,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { useTours } from '@/hooks/useTours';
import { TourCard } from '@/components/TourCard';

export function Home() {
  const { t, i18n } = useTranslation();
  const { featuredTours } = useTours();
  const lang = i18n.language as 'es' | 'en';

  const services = [
    {
      icon: Car,
      title: t('services.privateTransport.title'),
      description: t('services.privateTransport.description'),
    },
    {
      icon: Compass,
      title: t('services.personalizedTours.title'),
      description: t('services.personalizedTours.description'),
    },
    {
      icon: Plane,
      title: t('services.airportTransfers.title'),
      description: t('services.airportTransfers.description'),
    },
    {
      icon: Mountain,
      title: t('services.adventure.title'),
      description: t('services.adventure.description'),
    },
  ];

  const reasons = [
    {
      icon: Users,
      title: t('whyChooseUs.personalized.title'),
      description: t('whyChooseUs.personalized.description'),
    },
    {
      icon: Calendar,
      title: t('whyChooseUs.flexible.title'),
      description: t('whyChooseUs.flexible.description'),
    },
    {
      icon: Award,
      title: t('whyChooseUs.experience.title'),
      description: t('whyChooseUs.experience.description'),
    },
    {
      icon: Shield,
      title: t('whyChooseUs.comfort.title'),
      description: t('whyChooseUs.comfort.description'),
    },
  ];

  useDocumentHead({
    title: lang === 'es'
      ? 'Ecuador Tours & Transport | Tours Privados en Ecuador'
      : 'Ecuador Tours & Transport | Private Tours in Ecuador',
    meta: [
      { name: 'description', content: lang === 'es'
        ? 'Descubre Ecuador con tours privados y transporte personalizado. SUV de 7 asientos, guía bilingüe, experiencias únicas en Quito, Cotopaxi, Baños y más.'
        : 'Discover Ecuador with private tours and personalized transport. 7-seat SUV, bilingual guide, unique experiences in Quito, Cotopaxi, Baños and more.' },
      { property: 'og:title', content: 'Ecuador Tours & Transport' },
      { property: 'og:description', content: lang === 'es'
        ? 'Tours privados y transporte personalizado en Ecuador'
        : 'Private tours and personalized transport in Ecuador' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://ecuadortours.com' },
      { property: 'og:image', content: 'https://ecuadortours.com/images/og-image.jpg' },
    ],
    canonical: 'https://ecuadortours.com/',
  });

  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/hero-ecuador.jpg"
              alt="Ecuador Landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D62]/70 via-[#0A3D62]/50 to-[#0A3D62]/80" />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
                <MapPin className="w-4 h-4 text-[#F5A623]" />
                <span className="text-sm text-white/90">Sangolquí, Ecuador</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t('hero.title')}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/tours"
                  className="group flex items-center gap-2 px-8 py-4 bg-[#F5A623] hover:bg-[#E09513] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#F5A623]/30"
                >
                  <span>{t('hero.ctaTours')}</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="#contact"
                  className="flex items-center gap-2 px-8 py-4 glass-card-strong text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t('hero.ctaContact')}</span>
                </a>
              </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
              >
                <div className="w-1.5 h-3 bg-white/50 rounded-full" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Tours Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('featured.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
                {t('featured.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card text-[#0A3D62] dark:text-[#74B9FF] font-medium rounded-xl hover:bg-[#0A3D62]/10 dark:hover:bg-[#74B9FF]/10 transition-all duration-300"
              >
                <span>{t('featured.viewAll')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#0A3D62]/5 dark:via-[#74B9FF]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#0A3D62] to-[#1B6CA8] flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A3D62] dark:text-[#F4F9FF] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('whyChooseUs.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
                {t('whyChooseUs.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-12 h-12 mb-4 rounded-xl bg-[#F5A623]/10 flex items-center justify-center group-hover:bg-[#F5A623]/20 transition-colors">
                      <reason.icon className="w-6 h-6 text-[#F5A623]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A3D62] dark:text-[#F4F9FF] mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card-strong rounded-3xl p-8 sm:p-12 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 mb-8">
                {t('contact.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="https://wa.me/593999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/30"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="mailto:info@ecuadortours.com"
                  className="flex items-center gap-3 px-8 py-4 glass-card text-[#0A3D62] dark:text-[#F4F9FF] font-semibold rounded-xl hover:bg-[#0A3D62]/10 dark:hover:bg-[#74B9FF]/10 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email</span>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
                <p className="text-sm text-[#1E272E]/50 dark:text-[#E0E0E0]/50">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {t('contact.availability')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <motion.a
          href="https://wa.me/593999999999"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:scale-110 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.a>
      </main>
    </>
  );
}