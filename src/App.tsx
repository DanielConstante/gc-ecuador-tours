import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Home } from '@/pages/Home';
import { Tours } from '@/pages/Tours';
import { TourDetails } from '@/pages/TourDetails';
import { Contact } from '@/pages/Contact';
import { Gallery } from '@/pages/Gallery';
import { Testimonials } from '@/pages/Testimonials';
import './i18n';
import './App.css';

function App() {
  return (
    <ThemeProvider>
        <Toaster richColors position="top-center" />
        <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-[#F4F9FF] dark:bg-[#0F172A] transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
            </Routes>
            <Footer />
          </div>
        </HashRouter>
      </ThemeProvider>
  );
}

export default App;