export type TextTestimonial = {
  name: string;
  location: { es: string; en: string };
  stars: number;
  quote: { es: string; en: string };
};

export type ImageTestimonial = {
  id: number;
  image: string;
  name: string;
  location: { es: string; en: string };
  stars: number;
};

export const textTestimonials: TextTestimonial[] = [
  {
    name: 'Edith & Philip',
    location: { es: 'Canadá 🇨🇦', en: 'Canada 🇨🇦' },
    stars: 5,
    quote: {
      en: 'We had an exceptional visit to Ecuador thanks to you and your expertise. We enjoyed travelling together, discovering amazing places, tasting delicious food and having great conversations. Your warm and kind personality was a real gift for us!',
      es: 'Tuvimos una visita excepcional a Ecuador gracias a ti y tu experiencia. Disfrutamos viajar juntos, descubrir lugares increíbles, probar comida deliciosa y tener grandes conversaciones. ¡Tu cálida personalidad fue un verdadero regalo para nosotros!',
    },
  },
  {
    name: 'Linda & Robert',
    location: { es: 'Reino Unido 🇬🇧', en: 'United Kingdom 🇬🇧' },
    stars: 5,
    quote: {
      en: 'Thank you so much for everything, Don Galo! We are returning home so happy, carrying wonderful memories of Ecuador and the Galápagos. You helped make this trip truly special — thank you for all your guidance and warm hospitality!',
      es: '¡Muchísimas gracias por todo, Don Galo! Regresamos a casa muy felices, con recuerdos maravillosos de Ecuador y las Galápagos. Nos ayudaste a hacer este viaje verdaderamente especial. ¡Gracias por toda tu guía y cálida hospitalidad!',
    },
  },
  {
    name: 'Sarah & James',
    location: { es: 'Nueva York, EE.UU. 🇺🇸', en: 'New York, USA 🇺🇸' },
    stars: 5,
    quote: {
      en: "Don Galo is simply the best guide we've ever had! From the colonial streets of Quito to the breathtaking views of Cotopaxi, he made every moment unforgettable. His passion for Ecuador is truly contagious — we highly recommend GC Ecuador Tours!",
      es: '¡Don Galo es simplemente el mejor guía que hemos tenido! Desde las calles coloniales de Quito hasta las impresionantes vistas del Cotopaxi, hizo cada momento inolvidable. Su pasión por Ecuador es contagiosa. ¡Recomendamos ampliamente GC Ecuador Tours!',
    },
  },
  {
    name: 'Sylvie & Michel',
    location: { es: 'Canadá 🇨🇦', en: 'Canada 🇨🇦' },
    stars: 5,
    quote: {
      en: "If you need a dedicated English speaking guide and driver who knows everything about Ecuador, Galo Constante is the go-to guy! We went on an 8-day Galápagos cruise and then a one-week mainland Ecuador discovery with Galo. It was easy to organize and absolutely fabulous. A huge thank you to both Ellen and Galo for a trip of a lifetime.",
      es: 'Si necesitas un guía y conductor dedicado que sepa todo sobre Ecuador, ¡Galo Constante es la persona indicada! Hicimos un crucero de 8 días por las Galápagos y luego una semana explorando el Ecuador continental. Fue fácil de organizar y absolutamente fabuloso. Un enorme agradecimiento a Ellen y a Galo por el viaje de su vida.',
    },
  },
];

export const imageTestimonials: ImageTestimonial[] = [
  { id: 1, image: '/images/testimonial-1.jpeg', name: 'Jake & Emily', location: { es: 'Mensaje de WhatsApp', en: 'WhatsApp Message' }, stars: 5 },
  { id: 2, image: '/images/testimonial-2.jpeg', name: 'Merjin & Johanna', location: { es: 'Mensaje de WhatsApp', en: 'WhatsApp Message' }, stars: 5 },
  { id: 3, image: '/images/testimonial-3.jpeg', name: 'Chris & Amanda', location: { es: 'Reseña del Hotel', en: 'Hotel Review' }, stars: 5 },
];
