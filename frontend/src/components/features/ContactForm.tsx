import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const projectTypes = [
  'Application web',
  'API / Backend',
  'Infrastructure / DevOps',
  'Architecture technique',
  'Conseil / Audit',
  'Autre',
];

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  project_type: string;
  message: string;
  website: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    project_type: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      newErrors.name = 'Le nom est requis (min. 2 caracteres).';
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = 'Une adresse email valide est requise.';
    if (!formData.project_type)
      newErrors.project_type = 'Selectionnez un type de projet.';
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = 'Le message doit contenir au moins 10 caracteres.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Erreur lors de l\'envoi.');
      }
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        budget: '',
        project_type: '',
        message: '',
        website: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        data-testid="contact-success"
        className="text-center py-16"
      >
        <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
        <h3 className="font-heading text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          Message envoye !
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400">
          Merci pour votre message. Je vous repondrai dans les plus brefs delais.
        </p>
        <button
          onClick={() => setStatus('idle')}
          data-testid="contact-send-another"
          className="mt-6 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors underline underline-offset-4"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  const inputBase =
    'w-full px-4 py-3 text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-colors';

  return (
    <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-5">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
            Nom *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="contact-name"
            className={inputBase}
            placeholder="Votre nom"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="contact-email"
            className={inputBase}
            placeholder="votre@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
            Entreprise
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            data-testid="contact-company"
            className={inputBase}
            placeholder="Votre entreprise"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
            Budget
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            data-testid="contact-budget"
            className={inputBase}
            placeholder="Ex: 5k-10k EUR"
          />
        </div>
      </div>

      <div>
        <label htmlFor="project_type" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
          Type de projet *
        </label>
        <select
          id="project_type"
          name="project_type"
          value={formData.project_type}
          onChange={handleChange}
          data-testid="contact-project-type"
          className={inputBase}
        >
          <option value="">Selectionnez un type</option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.project_type && (
          <p className="mt-1 text-xs text-red-500">{errors.project_type}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          data-testid="contact-message"
          rows={5}
          className={`${inputBase} resize-none`}
          placeholder="Decrivez votre projet..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div
          data-testid="contact-error"
          className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
        >
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        data-testid="contact-submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-medium text-sm rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={16} />
            Envoyer le message
          </>
        )}
      </button>

      <p className="text-xs text-zinc-400 dark:text-zinc-600">
        Vos informations sont confidentielles et ne seront jamais partagees avec des tiers.
      </p>
    </form>
  );
};

export default ContactForm;
