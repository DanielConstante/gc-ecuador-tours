import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Tours } from '@/pages/Tours';
import { TourDetails } from '@/pages/TourDetails';
import './i18n';
import './App.css';

function App() {
  return (
    <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#F4F9FF] dark:bg-[#0F172A] transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetails />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;