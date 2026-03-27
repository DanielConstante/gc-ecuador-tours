import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { useCallback, useEffect, useState } from 'react';
import { textTestimonials } from '@/data/testimonials';
import useEmblaCarousel from 'embla-carousel-react';

const CAR_IMAGES = [
  '/images/car/IMG_1428.JPG',
  '/images/car/IMG_1429.JPG',
  '/images/car/IMG_1430.JPG',
  '/images/car/IMG_1431.JPG',
  '/images/car/IMG_1432.JPG',
  '/images/car/IMG_1433.JPG',
  '/images/car/IMG_1434.JPG',
  '/images/car/IMG_1435.JPG',
  '/images/car/IMG_1436.JPG',
  '/images/car/IMG_1437.JPG',
  '/images/car/IMG_1438.JPG',
  '/images/car/IMG_1439.JPG',
  '/images/car/IMG_1440.JPG',
  '/images/car/IMG_1441.JPG',
  '/images/car/IMG_1442.JPG',
  '/images/car/IMG_1443.JPG',
  '/images/car/IMG_1444.JPG',
  '/images/car/IMG_1445.JPG',
  '/images/car/IMG_1446.JPG',
  '/images/car/IMG_1447.JPG',
  '/images/car/IMG_1448.JPG',
  '/images/car/IMG_1449.JPG',
  '/images/car/IMG_1450.JPG',
  '/images/car/IMG_1451.JPG',
];

function CarCarousel({ lang }: { lang: 'es' | 'en' }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Autoplay every 4 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-20 bg-[#0A3D62] dark:bg-[#081D2E] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {lang === 'es' ? 'Nuestro Vehículo & Experiencias' : 'Our Vehicle & Experiences'}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            {lang === 'es'
              ? 'Viaja con comodidad en nuestro SUV de 7 asientos por los destinos más increíbles de Ecuador.'
              : 'Travel in comfort in our 7-seat SUV across Ecuador\'s most incredible destinations.'}
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {CAR_IMAGES.map((src, i) => (
                <div key={src} className="flex-none w-full sm:w-1/2 lg:w-1/3 px-2">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={src}
                      alt={`GC Ecuador Tours photo ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {CAR_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'bg-[#F5A623] w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Link to gallery */}
        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F5A623] hover:bg-[#E09513] text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-[#F5A623]/30"
          >
            {lang === 'es' ? 'Ver Galería Completa' : 'View Full Gallery'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
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
  MessageCircle,
  Utensils,
  Palette,
  Building2,
  Eye,
  Coffee,
  Star,
  Quote,
  CreditCard,
  Info
} from 'lucide-react';
import { useTours } from '@/hooks/useTours';
import { TourCard } from '@/components/TourCard';

export function Home() {
  const { t, i18n } = useTranslation();
  const { tours } = useTours();
  const featuredTours = tours.slice(0, 6);
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';

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

  const recommendations = [
    {
      id: 1,
      icon: Utensils,
      color: 'from-orange-500 to-red-500',
      badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      type: { es: 'Restaurante', en: 'Restaurant' },
      name: 'Vista Hermosa',
      description: {
        es: 'Restaurante en azotea con vistas panorámicas al Centro Histórico. Cocina ecuatoriana e internacional en un ambiente sofisticado.',
        en: 'Rooftop restaurant with panoramic views of the Historic Center. Ecuadorian and international cuisine in a sophisticated setting.',
      },
      tip: { es: 'Reserva con anticipación', en: 'Book in advance' },
      image: '/images/vista-hermosa.jpg',
    },
    {
      id: 2,
      icon: Palette,
      color: 'from-purple-500 to-indigo-600',
      badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      type: { es: 'Museo', en: 'Museum' },
      name: 'Museo Guayasamín',
      description: {
        es: 'Hogar del arte de Oswaldo Guayasamín, el pintor más célebre de Ecuador. La Capilla del Hombre es obra imprescindible.',
        en: "Home of Oswaldo Guayasamín's art, Ecuador's most celebrated painter. La Capilla del Hombre is a must-see.",
      },
      tip: { es: 'Incluye La Capilla del Hombre', en: 'Includes La Capilla del Hombre' },
      image: '/images/guayasamin.webp',
    },
    {
      id: 3,
      icon: Building2,
      color: 'from-slate-600 to-slate-800',
      badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-700/40 dark:text-slate-300',
      type: { es: 'Monumento', en: 'Landmark' },
      name: 'Basílica del Voto Nacional',
      description: {
        es: 'La iglesia neogótica más grande de América Latina. Sube a sus torres para vistas impresionantes de toda la ciudad.',
        en: 'The largest neo-Gothic church in Latin America. Climb its towers for breathtaking views across the entire city.',
      },
      tip: { es: 'Sube a las torres', en: 'Climb the towers' },
      image: '/images/basilica.jpg',
    },
    {
      id: 4,
      icon: Eye,
      color: 'from-sky-500 to-blue-600',
      badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
      type: { es: 'Mirador', en: 'Viewpoint' },
      name: 'El Panecillo',
      description: {
        es: 'Colina icónica coronada por la Virgen de Quito. Ofrece vistas de 360° sobre la ciudad y los volcanes andinos.',
        en: 'Iconic hill crowned by the Virgin of Quito statue. Offers 360° views over the city and the Andean volcanoes.',
      },
      tip: { es: 'Visita en taxi, no a pie', en: 'Take a taxi, do not walk' },
      image: '/images/panecillo.jfif',
    },
    {
      id: 5,
      icon: MapPin,
      color: 'from-amber-500 to-yellow-600',
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      type: { es: 'Barrio Histórico', en: 'Historic District' },
      name: 'La Ronda',
      description: {
        es: 'La calle más pintoresca del Centro Histórico. Artesanías, música en vivo y gastronomía tradicional ecuatoriana.',
        en: 'The most picturesque street in the Historic Center. Handicrafts, live music and traditional Ecuadorian gastronomy.',
      },
      tip: { es: 'Mejor de noche', en: 'Best in the evening' },
      image: '/images/la-ronda.jpg',
    },
    {
      id: 6,
      icon: Coffee,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      type: { es: 'Café & Bar', en: 'Café & Bar' },
      name: 'Café Mosaico',
      description: {
        es: 'Bar bohemio con terraza y vistas panorámicas de Quito. El mejor lugar para disfrutar el atardecer sobre la ciudad.',
        en: 'Bohemian bar with a terrace and panoramic views of Quito. The best spot to enjoy the sunset over the city.',
      },
      tip: { es: 'Perfecto al atardecer', en: 'Perfect at sunset' },
      image: '/images/cafe-mosaico.jpg',
    },
  ];

  const featuredTestimonials = textTestimonials.slice(0, 3);

  useDocumentHead({
    title: lang === 'es'
      ? 'GC Ecuador Tours & Transport | Tours Privados en Ecuador'
      : 'GC Ecuador Tours & Transport | Private Tours in Ecuador',
    meta: [
      { name: 'description', content: lang === 'es'
        ? 'Descubre Ecuador con tours privados y transporte personalizado. SUV de 7 asientos, guía bilingüe, experiencias únicas en Quito, Cotopaxi, Baños y más.'
        : 'Discover Ecuador with private tours and personalized transport. 7-seat SUV, bilingual guide, unique experiences in Quito, Cotopaxi, Baños and more.' },
      { property: 'og:title', content: 'GC Ecuador Tours & Transport' },
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

        {/* Car Carousel Section */}
        <CarCarousel lang={lang} />

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

        {/* Recommended in Quito Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#F5A623]/5 dark:via-[#F5A623]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623]/10 mb-4">
                <Star className="w-4 h-4 text-[#F5A623]" />
                <span className="text-sm font-medium text-[#F5A623]">Quito</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('recommendations.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
                {t('recommendations.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/60 to-transparent z-10" />
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-lg ${rec.badgeColor}`}>
                        {rec.type[lang]}
                      </span>
                    </div>
                    {/* Icon */}
                    <div className="absolute bottom-3 right-3 z-20">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${rec.color} flex items-center justify-center shadow-md`}>
                        <rec.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-[#0A3D62] dark:text-[#F4F9FF] mb-2">
                      {rec.name}
                    </h3>
                    <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 mb-4 leading-relaxed">
                      {rec.description[lang]}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-[#F5A623] font-medium">
                      <Star className="w-3.5 h-3.5 fill-[#F5A623]" />
                      <span>{rec.tip[lang]}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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

        {/* Testimonials Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623]/10 mb-4">
                <Star className="w-4 h-4 text-[#F5A623]" />
                <span className="text-sm font-medium text-[#F5A623]">{t('testimonials.badge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('testimonials.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
                {t('testimonials.subtitle')}
              </p>
            </motion.div>

            {/* Text Testimonials — top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {featuredTestimonials.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Quote className="w-8 h-8 text-[#F5A623]/60 shrink-0" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1E272E]/80 dark:text-[#E0E0E0]/80 leading-relaxed flex-1 italic">
                    "{item.quote[lang]}"
                  </p>
                  <div className="pt-4 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
                    <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF] text-sm">{item.name}</p>
                    <p className="text-xs text-[#1E272E]/50 dark:text-[#E0E0E0]/50 mt-0.5">{item.location[lang]}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* See all reviews link */}
            <div className="text-center">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A3D62] hover:bg-[#0d4f80] dark:bg-[#1B6CA8] dark:hover:bg-[#1e7bbf] text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Star className="w-4 h-4 fill-white" />
                {lang === 'es' ? 'Ver Todas las Reseñas' : 'See All Reviews'}
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card-strong rounded-2xl p-8 sm:p-10 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 mb-8">
                {t('contact.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/593984023098?text=${encodeURIComponent(lang === 'es' ? 'Hola! Me gustaría información sobre sus tours en Ecuador.' : 'Hello! I would like information about your tours in Ecuador.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/30"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="mailto:galoconstante@gmail.com"
                  className="flex items-center gap-3 px-8 py-4 glass-card text-[#0A3D62] dark:text-[#F4F9FF] font-semibold rounded-xl hover:bg-[#0A3D62]/10 dark:hover:bg-[#74B9FF]/10 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email</span>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20 flex flex-col items-center gap-4">
                <p className="text-sm text-[#1E272E]/50 dark:text-[#E0E0E0]/50">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {t('contact.availability')}
                </p>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-sm text-[#0A3D62] dark:text-[#74B9FF] font-medium hover:underline underline-offset-2 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  {t('contactPage.sendForm')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-[#0A3D62]/5 dark:via-[#74B9FF]/5 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex flex-col items-center gap-3 mb-4">
                <img
                  src="/images/security-symbol.jpeg"
                  alt="Ecuador Safety Certification"
                  className="w-20 h-20 object-contain rounded-xl shadow-md"
                />
                <span className="px-4 py-1.5 rounded-full bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF]">
                  {t('security.badge')}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                {t('security.title')}
              </h2>
              <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
                {t('security.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Transport Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-[#0A3D62] dark:text-[#74B9FF]" />
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.transport.title')}</h3>
                </div>
                <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 leading-relaxed">
                  {t('security.transport.body')}
                </p>
              </motion.div>

              {/* General Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-[#F5A623]" />
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.tips.title')}</h3>
                </div>
                <ul className="space-y-2">
                  {(t('security.tips.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ATM & Cash */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.atm.title')}</h3>
                </div>
                <ul className="space-y-2">
                  {(t('security.atm.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tourist Police */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-[#0A3D62] dark:text-[#74B9FF]" />
                  </div>
                  <h3 className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.police.title')}</h3>
                </div>
                <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 leading-relaxed">
                  {t('security.police.body')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp Button */}
        <motion.a
          href={`https://wa.me/593984023098?text=${encodeURIComponent(lang === 'es' ? 'Hola! Me gustaría información sobre sus tours en Ecuador.' : 'Hello! I would like information about your tours in Ecuador.')}`}
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