import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useDocumentHead } from '@/hooks/useDocumentHead';

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

export function Gallery() {
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useDocumentHead({
    title: lang === 'es'
      ? 'Galería | GC Ecuador Tours & Transport'
      : 'Gallery | GC Ecuador Tours & Transport',
    meta: [
      {
        name: 'description',
        content: lang === 'es'
          ? 'Galería de fotos de GC Ecuador Tours — nuestro vehículo, tours y experiencias en Ecuador.'
          : 'Photo gallery of GC Ecuador Tours — our vehicle, tours and experiences in Ecuador.',
      },
    ],
    canonical: 'https://ecuadortours.com/gallery',
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % CAR_IMAGES.length);
  }, [lightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + CAR_IMAGES.length) % CAR_IMAGES.length);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <main className="min-h-screen pt-28 pb-16 bg-[#F4F9FF] dark:bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 mb-4">
            <Images className="w-4 h-4 text-[#0A3D62] dark:text-[#74B9FF]" />
            <span className="text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF]">
              {lang === 'es' ? 'Nuestras Fotos' : 'Our Photos'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
            {lang === 'es' ? 'Galería' : 'Gallery'}
          </h1>
          <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Conoce nuestro vehículo y las experiencias que vivimos con nuestros clientes en Ecuador.'
              : 'Meet our vehicle and the experiences we share with our clients across Ecuador.'}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {CAR_IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`GC Ecuador Tours photo ${index + 1}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
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
            {/* Close */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={CAR_IMAGES[lightboxIndex]}
              alt={`GC Ecuador Tours photo ${lightboxIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm">
              {lightboxIndex + 1} / {CAR_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
