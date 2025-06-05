import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique d'envoi du formulaire
    console.log('Formulaire envoyé:', formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 theme-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Contactez-moi</h2>
          <div className="w-16 h-1 bg-primary-600 mx-auto rounded-full mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 focus:ring-2 focus:ring-offset-0 transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 focus:ring-2 focus:ring-offset-0 transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 focus:ring-2 focus:ring-offset-0 transition-all duration-300"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">💌</span>
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-12">
              <div className="flex items-center">
                <span className="text-primary-600 text-3xl mr-6">📧</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-2">contact@example.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-primary-600 text-3xl mr-6">📱</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-600 mt-2">+33 6 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-primary-600 text-3xl mr-6">📍</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Adresse</h3>
                  <p className="text-gray-600 mt-2">Paris, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
