import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { textTestimonials, imageTestimonials } from '@/data/testimonials';

export function Testimonials() {
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useDocumentHead({
    title: lang === 'es'
      ? 'Reseñas | GC Ecuador Tours & Transport'
      : 'Reviews | GC Ecuador Tours & Transport',
    meta: [
      {
        name: 'description',
        content: lang === 'es'
          ? 'Lee las opiniones de nuestros clientes sobre sus experiencias con GC Ecuador Tours & Transport.'
          : 'Read what our clients say about their experiences with GC Ecuador Tours & Transport.',
      },
    ],
    canonical: 'https://ecuadortours.com/testimonials',
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % imageTestimonials.length);
  };
  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + imageTestimonials.length) % imageTestimonials.length);
  };

  return (
    <main className="min-h-screen pt-28 pb-16 bg-[#F4F9FF] dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623]/10 mb-4">
            <Star className="w-4 h-4 text-[#F5A623]" />
            <span className="text-sm font-medium text-[#F5A623]">
              {lang === 'es' ? 'Clientes Felices' : 'Happy Clients'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
            {lang === 'es' ? 'Reseñas' : 'Reviews'}
          </h1>
          <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Lo que dicen nuestros clientes sobre sus experiencias en Ecuador con nosotros.'
              : 'What our clients say about their experiences exploring Ecuador with us.'}
          </p>
        </motion.div>

        {/* Text Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {textTestimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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

        {/* Image Testimonials — masonry */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-8 text-center"
        >
          {lang === 'es' ? 'Mensajes de Nuestros Clientes' : 'Messages from Our Clients'}
        </motion.h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {imageTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group glass-card"
              onClick={() => openLightbox(index)}
            >
              <img
                src={item.image}
                alt={lang === 'es' ? 'Reseña de viajero' : 'Traveler review'}
                className="w-full object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-4 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                  ))}
                </div>
                <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF] text-sm">{item.name}</p>
                <p className="text-xs text-[#1E272E]/50 dark:text-[#E0E0E0]/50 mt-0.5">{item.location[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            <button
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={imageTestimonials[lightboxIndex].image}
              alt={lang === 'es' ? 'Reseña de viajero' : 'Traveler review'}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm">
              {lightboxIndex + 1} / {imageTestimonials.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
