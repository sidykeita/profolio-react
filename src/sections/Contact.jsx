import React, { useState } from 'react';

const methods = [
  {
    title: 'WhatsApp',
    subtitle: '06-52-95-27-21',
    action: 'Write me →',
    icon: '🟢',
    href: 'https://wa.me/+33652952721'
  },
  {
    title: 'Mail',
    subtitle: 'sidyk68@gmail.com',
    action: 'Email me →',
    icon: '✉️',
    href: 'mailto:sidyk68@gmail.com'
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire envoyé:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: cards */}
          <div>
            <h3 className="text-center text-xl font-semibold text-primary-600 mb-6">Talk to me</h3>
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
            <h3 className="text-center text-xl font-semibold text-primary-600 mb-6">Write me your project</h3>
            <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-2xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-500 dark:text-gray-400">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Insert your name"
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-500 dark:text-gray-400">Mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Insert your email"
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-500 dark:text-gray-400">Project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your project"
                    required
                    className="mt-1 w-full rounded-xl border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-surface text-gray-900 dark:text-dark-text placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-700"
                >
                  Send Message <span className="ml-2">📨</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
