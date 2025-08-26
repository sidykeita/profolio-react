import React, { useState, useEffect } from 'react';

const methods = [
  {
    title: 'WhatsApp',
    subtitle: '06-52-95-27-21',
    action: 'Écris‑moi →',
    icon: (
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full" style={{ backgroundColor: '#25D366' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5"
          fill="#ffffff"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M19.11 17.46c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.14-.66.14-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.14-.17.19-.29.29-.49.1-.2.05-.37-.02-.51-.07-.14-.66-1.6-.91-2.2-.24-.58-.49-.5-.66-.5h-.56c-.2 0-.51.07-.77.37-.26.29-1.01.99-1.01 2.41 0 1.42 1.03 2.79 1.18 2.98.15.2 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.31.19 1.8.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33z"/>
          <path d="M26.01 5.99C23.38 3.36 19.85 2 16.18 2 8.94 2 3 7.94 3 15.18c0 2.34.62 4.61 1.79 6.61L3 30l8.4-1.76c1.93 1.05 4.12 1.61 6.35 1.61 7.24 0 13.18-5.94 13.18-13.18 0-3.53-1.38-7.05-4-9.68zM17.75 27.3c-1.99 0-3.94-.53-5.64-1.54l-.41-.24-4.99 1.05 1.06-4.87-.26-.43C6.43 19.51 5.9 17.39 5.9 15.18c0-5.64 4.59-10.23 10.23-10.23 2.73 0 5.29 1.06 7.22 2.99 1.93 1.93 2.99 4.49 2.99 7.22 0 5.64-4.59 10.23-10.23 10.23z"/>
        </svg>
      </span>
    ),
    href: 'https://wa.me/+33652952721'
  },
  {
    title: 'Mail',
    subtitle: 'sidyk68@gmail.com',
    action: 'Envoyer moi un email →',
    icon: '✉️',
    href: 'mailto:sidyk68@gmail.com'
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  // Envoi direct vers votre boîte mail via FormSubmit (pas de backend requis)
  // Astuce: configurez un champ _next pour la redirection post-soumission.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      setSent(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      // Utiliser FormData (évite les soucis d'en-têtes CORS/JSON)
      const body = new FormData();
      body.append('name', formData.name);
      body.append('email', formData.email);
      body.append('message', formData.message);
      body.append('_subject', 'Nouveau message depuis le portfolio');
      body.append('_template', 'table');
      body.append('_captcha', 'false');

      const res = await fetch('https://formsubmit.co/ajax/sidyk68@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body
      });
      if (!res.ok) {
        // Essayer de lire la réponse pour un message plus précis
        let msg = 'Erreur lors de l\'envoi';
        try {
          const errJson = await res.json();
          if (errJson?.message) msg = errJson.message;
        } catch (_) {}
        throw new Error(msg);
      }
      const data = await res.json();
      if (data?.success === 'true' || data?.success === true) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data?.message || 'Envoi non confirmé');
      }
    } catch (err) {
      setError((err && err.message) ? err.message : "L'envoi a échoué. Veuillez réessayer ou m'écrire à sidyk68@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title (consistent with other sections) */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 via-primary-600 to-amber-400 bg-clip-text text-transparent dark:from-white dark:via-primary-400 dark:to-yellow-300">Contact</h2>
        </div>
        {sent && (
          <div className="mb-8 max-w-3xl mx-auto rounded-xl border border-green-300 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200 dark:border-green-700 px-4 py-3">
            Message envoyé avec succès. Merci ! Je vous répondrai rapidement.
          </div>
        )}
        {error && (
          <div className="mb-8 max-w-3xl mx-auto rounded-xl border border-red-300 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200 dark:border-red-700 px-4 py-3">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: cards */}
          <div>
            <h3 className="text-center text-xl font-semibold text-primary-600 mb-6">Contactez‑moi</h3>
            <div className="space-y-5">
              {methods.map((m, i) => (
                <a
                  key={i}
                  href={m.href}
                  className="block bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow hover:border-primary-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{m.icon}</div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white font-medium">{m.title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{m.subtitle}</p>
                      <span className="inline-flex items-center text-sm text-primary-600 mt-3">{m.action}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h3 className="text-center text-xl font-semibold text-primary-600 mb-6">Envoyer moi un message</h3>
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-500 dark:text-gray-400">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Entrez votre nom"
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-500 dark:text-gray-400">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Entrez votre email"
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-500 dark:text-gray-400">Projet</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet"
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full btn-gradient-violet text-white font-medium ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Envoi…' : 'Envoyer le message'} <span className="ml-2">📨</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
