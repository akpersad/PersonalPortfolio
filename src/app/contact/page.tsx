'use client';

import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface FormData {
  name: string;
  email: string;
  role: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  [key: string]: string;
}

const inputClasses = (hasError: boolean) =>
  `w-full rounded-md border bg-surface px-4 py-3 text-fg placeholder:text-fg-muted ${
    hasError ? 'border-danger' : 'border-line-strong'
  }`;

export default function Contact() {
  const { trackContactFormSubmission, trackExternalLinkClick } = useAnalytics();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
    message: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please add your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name needs at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please add your email so I can reply.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email =
          'That email looks incomplete. Try the name@example.com shape.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please add a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message =
        'A little more detail helps. 10 characters is the floor.';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message is over the 2000 character limit.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          'Message sent. Thank you, I will get back to you within a day or two.'
        );
        trackContactFormSubmission(formData.role || 'general', true);
        setFormData({
          name: '',
          email: '',
          role: '',
          message: '',
          website: '',
        });
      } else {
        setSubmitStatus('error');
        trackContactFormSubmission(formData.role || 'general', false);
        if (result.details && Array.isArray(result.details)) {
          setSubmitMessage(result.details.join('. '));
        } else {
          setSubmitMessage(
            result.error || 'The message did not send. Please try again.'
          );
        }
      }
    } catch {
      setSubmitStatus('error');
      trackContactFormSubmission(formData.role || 'general', false);
      setSubmitMessage(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
      <section className="py-16 sm:py-24">
        <p className="annotation flex items-center gap-3 before:h-px before:w-10 before:bg-accent">
          Contact
        </p>
        <h1 className="mt-6 max-w-[16ch] text-display font-semibold text-fg">
          Say the word.
        </h1>
        <p className="mt-8 max-w-[58ch] text-lg text-fg-muted">
          I am currently looking for my next lead software engineer role. If
          you have one, or a project worth talking about, this form is the
          fastest way to reach me.
        </p>
      </section>

      <div className="grid gap-12 border-t border-line-strong pb-24 pt-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-x-16">
        {/* Form */}
        <div>
          <h2 className="text-xl font-semibold text-fg">Send a message</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-fg"
              >
                Name{' '}
                <span className="text-danger-ink" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="name"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={inputClasses(!!errors.name)}
                placeholder="Your name"
              />
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-danger-ink">
                  <span aria-hidden="true">&#9888; </span>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-fg"
              >
                Email{' '}
                <span className="text-danger-ink" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClasses(!!errors.email)}
                placeholder="name@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-danger-ink">
                  <span aria-hidden="true">&#9888; </span>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-fg"
              >
                What is this about?
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={inputClasses(false)}
              >
                <option value="">Select an option</option>
                <option value="job-opportunity">A role you are hiring for</option>
                <option value="consulting">A consulting project</option>
                <option value="collaboration">A collaboration</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-fg"
              >
                Message{' '}
                <span className="text-danger-ink" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClasses(!!errors.message)} resize-y`}
                placeholder="The role, the team, the problem. Whatever matters."
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-sm text-danger-ink">
                  <span aria-hidden="true">&#9888; </span>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Honeypot for spam protection */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Status messages (live regions) */}
            <div role="status">
              {submitStatus === 'success' && (
                <p className="flex gap-2 rounded-md border border-line-strong bg-surface p-4 text-sm text-fg">
                  <span className="text-accent-ink" aria-hidden="true">
                    &#10003;
                  </span>
                  {submitMessage}
                </p>
              )}
            </div>
            <div role="alert">
              {submitStatus === 'error' && (
                <p className="flex gap-2 rounded-md border border-danger bg-surface p-4 text-sm text-danger-ink">
                  <span aria-hidden="true">&#9888;</span>
                  {submitMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent-solid px-5 text-sm font-medium text-accent-contrast disabled:opacity-60 motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out-quint active:scale-[0.97] sm:w-auto"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>

        {/* Side notes */}
        <div className="space-y-10">
          <div>
            <p className="annotation">fig. 01 / status</p>
            <p className="mt-3 flex items-center gap-3 font-medium text-fg">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              Available for Lead Software Engineer Roles
            </p>
            <p className="mt-2 text-sm text-fg-muted">
              Open to remote, hybrid, or on-site positions.
            </p>
          </div>

          <div>
            <p className="annotation">fig. 02 / channels</p>
            <p className="mt-3 text-sm text-fg-muted">
              Use the contact form to get in touch, or find me here:
            </p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href="https://www.linkedin.com/in/andrew-persad-aa496432/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 font-mono text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
                  onClick={() =>
                    trackExternalLinkClick(
                      'LinkedIn',
                      'https://www.linkedin.com/in/andrew-persad-aa496432/',
                      'contact_page'
                    )
                  }
                >
                  LinkedIn Profile
                  <span aria-hidden="true">&#8599;</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/akpersad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 font-mono text-sm text-fg-muted hover:text-accent-ink motion-safe:transition-colors motion-safe:duration-150"
                  onClick={() =>
                    trackExternalLinkClick(
                      'GitHub',
                      'https://github.com/akpersad',
                      'contact_page'
                    )
                  }
                >
                  GitHub Profile
                  <span aria-hidden="true">&#8599;</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="annotation">fig. 03 / response time</p>
            <p className="mt-3 text-sm text-fg-muted">
              I reply within a day or two. If it is urgent, say so in the
              message and I will move faster.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
