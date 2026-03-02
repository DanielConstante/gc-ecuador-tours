import { useMemo } from 'react';
import toursData from '@/data/tours.json';

export interface Tour {
  id: number;
  slug: string;
  name: { es: string; en: string };
  city: string;
  duration: { es: string; en: string };
  price: number;
  currency: string;
  category: string;
  includes: { es: string[]; en: string[] };
  description: { es: string; en: string };
  image: string;
  featured: boolean;
}

export function useTours() {
  const tours: Tour[] = useMemo(() => toursData as Tour[], []);
  
  const featuredTours = useMemo(() => 
    tours.filter(tour => tour.featured), 
    [tours]
  );

  const cities = useMemo(() => 
    [...new Set(tours.map(tour => tour.city))].sort(),
    [tours]
  );

  const categories = useMemo(() => 
    [...new Set(tours.map(tour => tour.category))].sort(),
    [tours]
  );

  const getTourBySlug = (slug: string): Tour | undefined => {
    return tours.find(tour => tour.slug === slug);
  };

  const getRelatedTours = (currentSlug: string, limit: number = 3): Tour[] => {
    const currentTour = getTourBySlug(currentSlug);
    if (!currentTour) return [];
    
    return tours
      .filter(tour => tour.slug !== currentSlug && tour.category === currentTour.category)
      .slice(0, limit);
  };

  const filterTours = (
    city?: string, 
    category?: string, 
    minPrice?: number, 
    maxPrice?: number
  ): Tour[] => {
    return tours.filter(tour => {
      if (city && tour.city !== city) return false;
      if (category && tour.category !== category) return false;
      if (minPrice !== undefined && tour.price < minPrice) return false;
      if (maxPrice !== undefined && tour.price > maxPrice) return false;
      return true;
    });
  };

  return {
    tours,
    featuredTours,
    cities,
    categories,
    getTourBySlug,
    getRelatedTours,
    filterTours
  };
}