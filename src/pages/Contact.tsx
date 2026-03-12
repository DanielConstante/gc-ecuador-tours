import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import {
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
} from 'lucide-react';

export function Contact() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.startsWith('es') ? 'es' : 'en') as 'es' | 'en';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useDocumentHead({
    title: lang === 'es'
      ? 'Contacto | GC Ecuador Tours & Transport'
      : 'Contact | GC Ecuador Tours & Transport',
    meta: [
      { name: 'description', content: lang === 'es'
        ? 'Contáctanos para planificar tu tour privado en Ecuador.'
        : 'Contact us to plan your private tour in Ecuador.' },
    ],
    canonical: 'https://ecuadortours.com/contact',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const body = new URLSearchParams({
      'form-name': 'contact',
      ...formData,
    }).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ fullName: '', phone: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const whatsappUrl = `https://wa.me/593984023098?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola! Me gustaría información sobre sus tours en Ecuador.'
      : 'Hello! I would like information about your tours in Ecuador.'
  )}`;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5A623]/10 mb-4">
            <MessageCircle className="w-4 h-4 text-[#F5A623]" />
            <span className="text-sm font-medium text-[#F5A623]">GC Ecuador Tours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-4">
            {t('contactPage.title')}
          </h1>
          <p className="text-lg text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-xl mx-auto">
            {t('contactPage.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="glass-card-strong rounded-3xl p-7 sm:p-10">

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/15 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-[#25D366]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A3D62] dark:text-[#F4F9FF] mb-2">
                    {t('contactPage.form.successTitle')}
                  </h2>
                  <p className="text-[#1E272E]/70 dark:text-[#E0E0E0]/70 max-w-sm">
                    {t('contactPage.form.successText')}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2.5 rounded-xl glass-card text-[#0A3D62] dark:text-[#74B9FF] text-sm font-medium hover:bg-[#0A3D62]/10 dark:hover:bg-[#74B9FF]/10 transition-colors"
                  >
                    {lang === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                  </button>
                </motion.div>
              ) : (
                <form
                  name="contact"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-1.5">
                      <User className="w-4 h-4" />
                      {t('contactPage.form.fullName')} <span className="text-[#F5A623]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={t('contactPage.form.fullNamePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl glass-card bg-white/50 dark:bg-white/5 border border-[#0A3D62]/10 dark:border-[#74B9FF]/20 text-[#1E272E] dark:text-[#F4F9FF] placeholder-[#1E272E]/30 dark:placeholder-[#E0E0E0]/30 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 dark:focus:ring-[#74B9FF]/30 transition-all"
                    />
                  </div>

                  {/* Phone + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-1.5">
                        <Phone className="w-4 h-4" />
                        {t('contactPage.form.phone')} <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('contactPage.form.phonePlaceholder')}
                        className="w-full px-4 py-3 rounded-xl glass-card bg-white/50 dark:bg-white/5 border border-[#0A3D62]/10 dark:border-[#74B9FF]/20 text-[#1E272E] dark:text-[#F4F9FF] placeholder-[#1E272E]/30 dark:placeholder-[#E0E0E0]/30 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 dark:focus:ring-[#74B9FF]/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-1.5">
                        <Mail className="w-4 h-4" />
                        {t('contactPage.form.email')} <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contactPage.form.emailPlaceholder')}
                        className="w-full px-4 py-3 rounded-xl glass-card bg-white/50 dark:bg-white/5 border border-[#0A3D62]/10 dark:border-[#74B9FF]/20 text-[#1E272E] dark:text-[#F4F9FF] placeholder-[#1E272E]/30 dark:placeholder-[#E0E0E0]/30 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 dark:focus:ring-[#74B9FF]/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#0A3D62] dark:text-[#74B9FF] mb-1.5">
                      <MessageCircle className="w-4 h-4" />
                      {t('contactPage.form.message')} <span className="text-[#F5A623]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contactPage.form.messagePlaceholder')}
                      className="w-full px-4 py-3 rounded-xl glass-card bg-white/50 dark:bg-white/5 border border-[#0A3D62]/10 dark:border-[#74B9FF]/20 text-[#1E272E] dark:text-[#F4F9FF] placeholder-[#1E272E]/30 dark:placeholder-[#E0E0E0]/30 focus:outline-none focus:ring-2 focus:ring-[#0A3D62]/30 dark:focus:ring-[#74B9FF]/30 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <p className="text-sm text-red-600 dark:text-red-400">{t('contactPage.form.errorText')}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#0A3D62] hover:bg-[#1B6CA8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-[#0A3D62]/20"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t('contactPage.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('contactPage.form.submit')}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <p className="text-sm font-semibold text-[#1E272E]/50 dark:text-[#E0E0E0]/50 uppercase tracking-widest px-1">
              {t('contactPage.orContact')}
            </p>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/25 transition-colors">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">WhatsApp</p>
                <p className="text-sm text-[#1E272E]/60 dark:text-[#E0E0E0]/60">+593 98 402 3098</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:galoconstante@gmail.com"
              className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0A3D62]/20 dark:group-hover:bg-[#74B9FF]/20 transition-colors">
                <Mail className="w-6 h-6 text-[#0A3D62] dark:text-[#74B9FF]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">Email</p>
                <p className="text-sm text-[#1E272E]/60 dark:text-[#E0E0E0]/60 break-all">galoconstante@gmail.com</p>
              </div>
            </a>

            {/* Location */}
            <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#F5A623]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">{t('contact.location')}</p>
                <p className="text-sm text-[#1E272E]/60 dark:text-[#E0E0E0]/60">{t('contact.locationValue')}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0A3D62]/10 dark:bg-[#74B9FF]/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-[#0A3D62] dark:text-[#74B9FF]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A3D62] dark:text-[#F4F9FF]">
                  {lang === 'es' ? 'Horario' : 'Hours'}
                </p>
                <p className="text-sm text-[#1E272E]/60 dark:text-[#E0E0E0]/60">{t('contact.availability')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
