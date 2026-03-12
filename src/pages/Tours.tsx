import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { motion } from 'framer-motion';
import { Filter, MapPin, Tag, DollarSign, X, Car, Info, CreditCard, Shield } from 'lucide-react';
import { useTours } from '@/hooks/useTours';
import { TourCard } from '@/components/TourCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export function Tours() {
  const { t, i18n } = useTranslation();
  const { tours, cities, categories } = useTours();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';

  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = useMemo(() => {
    return Math.max(...tours.map(t => t.price), 200);
  }, [tours]);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (selectedCity !== 'all' && tour.city !== selectedCity) return false;
      if (selectedCategory !== 'all' && tour.category !== selectedCategory) return false;
      if (tour.price < priceRange[0] || tour.price > priceRange[1]) return false;
      return true;
    });
  }, [tours, selectedCity, selectedCategory, priceRange]);

  const hasActiveFilters = selectedCity !== 'all' || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < maxPrice;

  const clearFilters = () => {
    setSelectedCity('all');
    setSelectedCategory('all');
    setPriceRange([0, maxPrice]);
  };

  useDocumentHead({
    title: lang === 'es'
      ? 'Nuestros Tours | GC Ecuador Tours & Transport'
      : 'Our Tours | GC Ecuador Tours & Transport',
    meta: [
      { name: 'description', content: lang === 'es'
        ? 'Descubre todos nuestros tours privados en Ecuador. Quito, Cotopaxi, Baños, Otavalo y más destinos increíbles con transporte personalizado.'
        : 'Discover all our private tours in Ecuador. Quito, Cotopaxi, Baños, Otavalo and more incredible destinations with personalized transport.' },
      { property: 'og:title', content: lang === 'es' ? 'Nuestros Tours' : 'Our Tours' },
      { property: 'og:description', content: lang === 'es'
        ? 'Descubre Ecuador con nuestros tours privados'
        : 'Discover Ecuador with our private tours' },
    ],
    canonical: 'https://ecuadortours.com/tours',
  });

  return (
    <>
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
              {t('toursPage.title')}
            </h1>
            <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
              {t('toursPage.subtitle')}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10"
          >
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl text-[#0A3D62] dark:text-[#F4F9FF]"
              >
                <Filter className="w-4 h-4" />
                <span>{t('toursPage.filters.filterBy')}</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-[#F5A623] rounded-full" />
                )}
              </button>
            </div>

            {/* Filter Content */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="glass-card rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                  {/* City Filter */}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-2">
                      <MapPin className="w-4 h-4" />
                      {t('toursPage.filters.allCities')}
                    </label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="glass-card border-0">
                        <SelectValue placeholder={t('toursPage.filters.allCities')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('toursPage.filters.allCities')}</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Filter */}
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-2">
                      <Tag className="w-4 h-4" />
                      {t('toursPage.filters.allCategories')}
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="glass-card border-0">
                        <SelectValue placeholder={t('toursPage.filters.allCategories')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('toursPage.filters.allCategories')}</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="flex-1 lg:min-w-[200px]">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-2">
                      <DollarSign className="w-4 h-4" />
                      {t('toursPage.filters.priceRange')}: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={maxPrice}
                      step={10}
                      className="py-2"
                    />
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-[#1B6CA8] dark:text-[#74B9FF] hover:text-[#F5A623] transition-colors"
                      >
                        <X className="w-4 h-4" />
                        {lang === 'es' ? 'Limpiar filtros' : 'Clear filters'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-sm text-[#1E272E]/60 dark:text-[#E0E0E0]/60">
              {lang === 'es' 
                ? `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''} encontrado${filteredTours.length !== 1 ? 's' : ''}`
                : `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''} found`
              }
            </p>
          </motion.div>

          {/* Tours Grid */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center">
                <Filter className="w-10 h-10 text-[#0A3D62]/40 dark:text-[#74B9FF]/40" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A3D62] dark:text-[#F4F9FF] mb-2">
                {t('toursPage.noResults')}
              </h3>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 glass-card text-[#0A3D62] dark:text-[#74B9FF] rounded-xl hover:bg-[#0A3D62]/10 dark:hover:bg-[#74B9FF]/10 transition-colors"
              >
                {lang === 'es' ? 'Ver todos los tours' : 'View all tours'}
              </button>
            </motion.div>
          )}
        </div>

        {/* Safety Section */}
        <div className="max-w-7xl mx-auto mt-24 pt-16 border-t border-[#0A3D62]/10 dark:border-[#74B9FF]/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="flex flex-col items-center gap-3 mb-4">
              <img
                src="/images/security-symbol.jpeg"
                alt="Ecuador Safety Certification"
                className="w-16 h-16 object-contain rounded-xl shadow-md"
              />
              <span className="px-4 py-1.5 rounded-full bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF]">
                {t('security.badge')}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-3">
              {t('security.title')}
            </h2>
            <p className="text-base text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-2xl mx-auto">
              {t('security.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center shrink-0">
                  <Car className="w-4 h-4 text-[#0A3D62] dark:text-[#74B9FF]" />
                </div>
                <h3 className="font-semibold text-sm text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.transport.title')}</h3>
              </div>
              <p className="text-xs text-[#1E272E]/70 dark:text-[#E0E0E0]/70 leading-relaxed">
                {t('security.transport.body')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4 text-[#F5A623]" />
                </div>
                <h3 className="font-semibold text-sm text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.tips.title')}</h3>
              </div>
              <ul className="space-y-1.5">
                {(t('security.tips.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-sm text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.atm.title')}</h3>
              </div>
              <ul className="space-y-1.5">
                {(t('security.atm.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#1E272E]/70 dark:text-[#E0E0E0]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-[#0A3D62] dark:text-[#74B9FF]" />
                </div>
                <h3 className="font-semibold text-sm text-[#0A3D62] dark:text-[#F4F9FF]">{t('security.police.title')}</h3>
              </div>
              <p className="text-xs text-[#1E272E]/70 dark:text-[#E0E0E0]/70 leading-relaxed">
                {t('security.police.body')}
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}