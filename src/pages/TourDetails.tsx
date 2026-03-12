import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Tag,
  DollarSign,
  Check,
  ArrowLeft,
  MessageCircle,
  Download,
  Calendar,
  ListOrdered,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useTours } from '@/hooks/useTours';
import { TourCard } from '@/components/TourCard';
import { generateTourPDF } from '@/utils/pdfGenerator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function TourDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { getTourBySlug, getRelatedTours } = useTours();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';

  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);

  const tour = slug ? getTourBySlug(slug) : undefined;
  const relatedTours = slug ? getRelatedTours(slug, 3) : [];

  if (!tour) {
    return <Navigate to="/tours" replace />;
  }

  const handleDownloadPDF = async () => {
    const translations = {
      tourInfo: t('pdf.tourInfo'),
      contactInfo: t('pdf.contactInfo'),
      generated: t('pdf.generated'),
      bookNow: t('pdf.bookNow'),
      website: t('pdf.website'),
      includes: t('tourDetails.includes'),
      duration: t('tourDetails.duration'),
      price: t('tourDetails.price'),
      category: t('tourDetails.category'),
      itinerary: t('pdf.itinerary'),
      note: t('pdf.note'),
    };

    await generateTourPDF({ tour, language: lang, translations });
    setPdfDialogOpen(false);
    toast.success(t('pdf.downloadSuccess'));
  };

  const whatsappMessage = lang === 'es'
    ? `Hola! Me interesa el tour: ${tour.name.es}`
    : `Hello! I'm interested in the tour: ${tour.name.en}`;

  const whatsappUrl = `https://wa.me/593984023098?text=${encodeURIComponent(whatsappMessage)}`;

  // JSON-LD structured data for SEO
  const tourSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: tour.name[lang],
    description: tour.description[lang],
    image: `https://ecuadortours.com${tour.image}`,
    touristType: 'Tourist',
    additionalType: 'https://schema.org/TouristAttraction',
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: tour.currency,
      availability: 'https://schema.org/InStock',
    },
    location: {
      '@type': 'Place',
      name: tour.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: tour.city,
        addressCountry: 'EC',
      },
    },
  };

  useDocumentHead({
    title: `${tour.name[lang]} | GC Ecuador Tours & Transport`,
    meta: [
      { name: 'description', content: (tour.description[lang] ?? '').substring(0, 160) },
      { property: 'og:title', content: tour.name[lang] },
      { property: 'og:description', content: (tour.description[lang] ?? '').substring(0, 200) },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://ecuadortours.com/tours/${tour.slug}` },
      { property: 'og:image', content: `https://ecuadortours.com${tour.image}` },
      { property: 'article:published_time', content: new Date().toISOString() },
    ],
    canonical: `https://ecuadortours.com/tours/${tour.slug}`,
    jsonLd: tourSchema,
  });

  return (
    <>
      <main className="min-h-screen pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={tour.image}
              alt={tour.name[lang]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/90 via-[#0A3D62]/50 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Volver a tours' : 'Back to tours'}</span>
                </Link>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#F5A623] text-white text-sm font-medium rounded-full">
                    {tour.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    {tour.city}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl">
                  {tour.name[lang]}
                </h1>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass-card-strong rounded-2xl p-6 sm:p-8"
                >
                  {/* Quick Info */}
                  <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-[#0A3D62] dark:text-[#74B9FF]" />
                      </div>
                      <p className="text-xs text-[#1E272E]/60 dark:text-[#E0E0E0]/60 uppercase tracking-wider">
                        {t('tourDetails.duration')}
                      </p>
                      <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">
                        {tour.duration[lang]}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#F5A623]/10 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-[#F5A623]" />
                      </div>
                      <p className="text-xs text-[#1E272E]/60 dark:text-[#E0E0E0]/60 uppercase tracking-wider">
                        {t('tourDetails.price')}
                      </p>
                      <p className="font-semibold text-[#F5A623]">
                        ${tour.price} {tour.currency}
                      </p>
                      <p className="text-xs text-[#1E272E]/50 dark:text-[#E0E0E0]/50">
                        {t('toursPage.perPerson')}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center">
                        <Tag className="w-6 h-6 text-[#0A3D62] dark:text-[#74B9FF]" />
                      </div>
                      <p className="text-xs text-[#1E272E]/60 dark:text-[#E0E0E0]/60 uppercase tracking-wider">
                        {t('tourDetails.category')}
                      </p>
                      <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">
                        {tour.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                      {t('tourDetails.description')}
                    </h2>
                    <p className="text-[#1E272E]/80 dark:text-[#E0E0E0]/80 leading-relaxed">
                      {tour.description[lang]}
                    </p>
                  </div>

                  {/* Itinerary */}
                  {tour.itinerary && (
                    <div className="mb-8">
                      <h2 className="text-xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4 flex items-center gap-2">
                        <ListOrdered className="w-5 h-5 text-[#F5A623]" />
                        {lang === 'es' ? 'Itinerario' : 'Itinerary'}
                      </h2>
                      <ol className="space-y-3">
                        {tour.itinerary[lang].map((stop, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <span className="w-6 h-6 rounded-full bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-[#0A3D62] dark:text-[#74B9FF]">
                              {index + 1}
                            </span>
                            <span className="text-[#1E272E]/80 dark:text-[#E0E0E0]/80">
                              {stop}
                            </span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Includes */}
                  <div>
                    <h2 className="text-xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                      {t('tourDetails.includes')}
                    </h2>
                    <ul className="space-y-3">
                      {tour.includes[lang].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#25D366]" />
                          </div>
                          <span className="text-[#1E272E]/80 dark:text-[#E0E0E0]/80">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Note */}
                  {tour.note && (
                    <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20">
                      <Info className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#1E272E]/80 dark:text-[#E0E0E0]/80">
                        {tour.note[lang]}
                      </p>
                    </div>
                  )}
                </motion.div>

                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-8"
                >
                  <h2 className="text-xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                    {t('tourDetails.gallery')}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.name[lang]}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#0A3D62] to-[#1B6CA8] flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-80" />
                        <p className="text-sm opacity-80">SUV 7 Asientos</p>
                      </div>
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#1B6CA8] to-[#74B9FF] flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <MapPin className="w-8 h-8 mx-auto mb-2 opacity-80" />
                        <p className="text-sm opacity-80">{tour.city}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="sticky top-24 space-y-4"
                >
                  {/* Book Now Card */}
                  <div className="glass-card-strong rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                      {lang === 'es' ? '¿Listo para reservar?' : 'Ready to book?'}
                    </h3>
                    <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 mb-6">
                      {lang === 'es' 
                        ? 'Contáctanos directamente por WhatsApp para reservar tu tour.' 
                        : 'Contact us directly via WhatsApp to book your tour.'}
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#25D366]/30"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{t('tourDetails.bookWhatsApp')}</span>
                    </a>
                  </div>

                  {/* Security Note Card */}
                  <div className="glass-card rounded-2xl p-5 border border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src="/images/security-symbol.jpeg"
                        alt="Safety"
                        className="w-10 h-10 object-contain rounded-lg shrink-0"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#0A3D62] dark:text-[#74B9FF] uppercase tracking-wide">
                          {t('security.badge')}
                        </p>
                        <p className="text-xs text-[#1E272E]/50 dark:text-[#E0E0E0]/50">
                          {t('security.tourNoteTip')}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-[#1E272E]/70 dark:text-[#E0E0E0]/70 leading-relaxed">
                      {t('security.tourNote')}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{lang === 'es' ? 'Certificado ANT' : 'ANT Certified'}</span>
                    </div>
                  </div>

                  {/* Download PDF Card */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
                      {lang === 'es' ? 'Información del tour' : 'Tour information'}
                    </h3>
                    <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 mb-6">
                      {lang === 'es' 
                        ? 'Descarga toda la información del tour en PDF.' 
                        : 'Download all tour information in PDF format.'}
                    </p>

                    <Dialog open={pdfDialogOpen} onOpenChange={setPdfDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center gap-2 border-[#0A3D62]/20 dark:border-[#74B9FF]/20 hover:bg-[#0A3D62]/5 dark:hover:bg-[#74B9FF]/5"
                        >
                          <Download className="w-5 h-5" />
                          <span>{t('tourDetails.downloadPDF')}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            {lang === 'es' ? 'Descargar PDF' : 'Download PDF'}
                          </DialogTitle>
                          <DialogDescription>
                            {lang === 'es' 
                              ? 'El PDF incluirá toda la información del tour, imágenes y datos de contacto.' 
                              : 'The PDF will include all tour information, images, and contact details.'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-3 mt-4">
                          <Button
                            onClick={handleDownloadPDF}
                            className="bg-[#0A3D62] hover:bg-[#1B6CA8] text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {lang === 'es' ? 'Descargar ahora' : 'Download now'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Tours */}
        {relatedTours.length > 0 && (
          <section className="mt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-8">
                  {t('tourDetails.relatedTours')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedTours.map((tour, index) => (
                    <TourCard key={tour.id} tour={tour} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}