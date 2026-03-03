import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import type { Tour } from '@/hooks/useTours';

interface TourCardProps {
  tour: Tour;
  index?: number;
}

export function TourCard({ tour, index = 0 }: TourCardProps) {
  const { i18n, t } = useTranslation();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/tours/${tour.slug}`} className="block h-full">
        <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#0A3D62]/10 dark:group-hover:shadow-[#74B9FF]/10 group-hover:-translate-y-1">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A3D62]/60 to-transparent z-10" />
            <img
              src={tour.image}
              alt={tour.name[lang]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Category Badge */}
            <div className="absolute top-3 left-3 z-20">
              <span className="px-3 py-1 text-xs font-medium bg-[#F5A623] text-white rounded-full shadow-lg">
                {tour.category}
              </span>
            </div>
            {/* Price Badge */}
            <div className="absolute bottom-3 right-3 z-20">
              <div className="bg-[#0A3D62]/85 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-lg font-bold text-[#F5A623]">
                  ${tour.price}
                </span>
                <span className="text-xs text-white/80 ml-1">
                  {t('toursPage.perPerson')}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-center gap-2 text-sm text-[#1B6CA8] dark:text-[#74B9FF] mb-2">
              <MapPin className="w-4 h-4" />
              <span>{tour.city}</span>
            </div>

            <h3 className="text-lg font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-2 line-clamp-2 group-hover:text-[#1B6CA8] dark:group-hover:text-[#74B9FF] transition-colors">
              {tour.name[lang]}
            </h3>

            <p className="text-sm text-[#1E272E]/70 dark:text-[#E0E0E0]/70 line-clamp-2 mb-4 flex-grow">
              {tour.description[lang]}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
              <div className="flex items-center gap-2 text-sm text-[#1E272E]/60 dark:text-[#E0E0E0]/60">
                <Clock className="w-4 h-4" />
                <span>{tour.duration[lang]}</span>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] group-hover:gap-2 transition-all">
                <span>{t('toursPage.viewDetails')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}