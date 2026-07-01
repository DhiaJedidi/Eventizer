'use client'

import { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { getContent } from '@/lib/content-i18n'
import type { Locale } from '@/lib/i18n'
import { contactSchema, type ContactInput } from '@/lib/schemas'
import { track } from '@/lib/analytics'
import type { ContactInfoView } from '@/types'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Container } from '@/components/ui/Container'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputBase =
  'w-full rounded-md border bg-white px-4 py-3.5 text-[15px] text-ink placeholder:text-mute ' +
  'transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-cobalt/15'

export function Contact({ contactInfo, locale }: { contactInfo: ContactInfoView; locale: Locale }) {
  const { CONTACT } = getContent(locale)
  const [status, setStatus] = useState<Status>('idle')
  const sectionRef = useGsapReveal<HTMLElement>({ childSelector: '.contact-reveal', y: 28, stagger: 0.16, start: 'top 82%' })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: 'onBlur' })

  const onSubmit = async (data: ContactInput) => {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      track('contact_form_submit')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden border-t border-line bg-cream py-28 sm:py-32 lg:py-40">
      {/* On-brand abstract texture (Higgsfield), multiplied so only the cobalt/gold waves show */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-cover bg-top bg-no-repeat opacity-50 mix-blend-multiply [mask-image:linear-gradient(to_bottom,black,transparent)]"
        style={{ backgroundImage: 'url(/images/textures/brand-aurora.webp)' }}
      />
      <Container className="relative z-10">
        <header className="contact-reveal mx-auto max-w-2xl text-center">
          {contactInfo.eyebrow ? <p className="eyebrow text-cobalt">{contactInfo.eyebrow}</p> : null}
          <h2 className="mt-5 font-heading text-display-lg font-bold text-ink">{contactInfo.title}</h2>
          {contactInfo.subtitle ? (
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mute">{contactInfo.subtitle}</p>
          ) : null}
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="contact-reveal">
            {status === 'success' ? (
              <div className="spotlight grad-border rounded-2xl border border-line bg-white p-8">
                <SuccessState contactInfo={contactInfo} locale={locale} />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} aria-label={CONTACT.formAria} noValidate className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="firstName" label={CONTACT.fields.firstName.label} placeholder={CONTACT.fields.firstName.placeholder} error={errors.firstName?.message} autoComplete="given-name" {...register('firstName')} />
                  <Field id="lastName" label={CONTACT.fields.lastName.label} placeholder={CONTACT.fields.lastName.placeholder} error={errors.lastName?.message} autoComplete="family-name" {...register('lastName')} />
                </div>
                <Field id="email" type="email" label={CONTACT.fields.email.label} placeholder={CONTACT.fields.email.placeholder} error={errors.email?.message} autoComplete="email" {...register('email')} />
                <Field id="phone" type="tel" label={CONTACT.fields.phone.label} placeholder={CONTACT.fields.phone.placeholder} error={errors.phone?.message} autoComplete="tel" {...register('phone')} />
                <SelectField id="eventType" label={CONTACT.fields.eventType.label} placeholder={CONTACT.fields.eventType.placeholder} options={CONTACT.eventTypeOptions} error={errors.eventType?.message} {...register('eventType')} />
                <TextareaField id="message" label={CONTACT.fields.message.label} placeholder={CONTACT.fields.message.placeholder} error={errors.message?.message} {...register('message')} />

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  aria-disabled={status === 'submitting'}
                  aria-label={status === 'submitting' ? CONTACT.loadingAria : CONTACT.submitAria}
                  className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-cobalt text-base font-semibold text-white transition-[filter] duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Spinner />
                      {CONTACT.loading}
                    </>
                  ) : (
                    CONTACT.submit
                  )}
                </button>

                {status === 'error' ? (
                  <p role="alert" aria-live="polite" className="rounded-md border border-danger/30 bg-danger/5 p-3 text-sm text-danger">
                    {CONTACT.systemError}{' '}
                    <a href={`tel:${contactInfo.phoneHref}`} className="font-semibold underline">{contactInfo.phoneDisplay}</a>.
                  </p>
                ) : null}

                <p className="text-sm text-mute">{CONTACT.reassurance}</p>
              </form>
            )}
          </div>

          <div className="contact-reveal">
            <ContactDetails contactInfo={contactInfo} locale={locale} />
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ── Fields ──────────────────────────────────────────────────────────────── */

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

const Field = forwardRef<HTMLInputElement, FieldProps>(({ id, label, error, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-body">{label}</label>
    <input
      id={id}
      ref={ref}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} ${error ? 'border-danger focus:ring-danger/15' : 'border-line focus:border-cobalt'}`}
      {...props}
    />
    <FieldError id={id} error={error} />
  </div>
))
Field.displayName = 'Field'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  placeholder: string
  options: readonly string[]
  error?: string
}

const SelectField = forwardRef<HTMLSelectElement, SelectProps>(({ id, label, placeholder, options, error, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-body">{label}</label>
    <select
      id={id}
      ref={ref}
      defaultValue=""
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} ${error ? 'border-danger focus:ring-danger/15' : 'border-line focus:border-cobalt'}`}
      {...props}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <FieldError id={id} error={error} />
  </div>
))
SelectField.displayName = 'SelectField'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
  error?: string
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaProps>(({ id, label, error, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-body">{label}</label>
    <textarea
      id={id}
      ref={ref}
      rows={4}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputBase} ${error ? 'border-danger focus:ring-danger/15' : 'border-line focus:border-cobalt'}`}
      {...props}
    />
    <FieldError id={id} error={error} />
  </div>
))
TextareaField.displayName = 'TextareaField'

const FieldError = ({ id, error }: { id: string; error?: string }) =>
  error ? (
    <p id={`${id}-error`} aria-live="polite" className="text-sm text-danger">{error}</p>
  ) : null

/* ── Success + details ───────────────────────────────────────────────────── */

function SuccessState({ contactInfo, locale }: { contactInfo: ContactInfoView; locale: Locale }) {
  const { CONTACT } = getContent(locale)
  return (
    <div role="status" aria-live="polite" className="flex flex-col gap-4">
      <h3 className="font-heading text-2xl font-semibold text-ink">{CONTACT.success.title}</h3>
      <p className="leading-relaxed text-body">{CONTACT.success.body}</p>
      <p className="leading-relaxed text-body">{CONTACT.success.altPrompt}</p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${contactInfo.phoneHref}`}
          onClick={() => track('phone_click', { location: 'success' })}
          className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:border-cobalt hover:text-cobalt"
        >
          {contactInfo.phoneDisplay}
        </a>
        <a
          href={`https://wa.me/${contactInfo.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { location: 'success' })}
          aria-label={CONTACT.details.whatsappAria}
          className="inline-flex min-h-[44px] items-center rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white"
        >
          {CONTACT.details.whatsapp}
        </a>
      </div>
    </div>
  )
}

function ContactDetails({ contactInfo, locale }: { contactInfo: ContactInfoView; locale: Locale }) {
  const { CONTACT } = getContent(locale)
  return (
    <div className="spotlight grad-border h-full rounded-2xl border border-line bg-white p-8">
      <h3 className="font-heading text-xl font-semibold text-ink">{CONTACT.details.heading}</h3>
      <ul className="mt-8 flex flex-col gap-5">
        <li className="flex items-center gap-4">
          <IconBox><PhoneIcon /></IconBox>
          <div>
            <p className="text-[13px] text-mute">Téléphone</p>
            <a
              href={`tel:${contactInfo.phoneHref}`}
              aria-label={CONTACT.details.phoneAria}
              onClick={() => track('phone_click', { location: 'contact_section' })}
              className="text-base font-medium text-ink hover:text-cobalt"
            >
              {contactInfo.phoneDisplay}
            </a>
          </div>
        </li>
        <li className="flex items-center gap-4">
          <IconBox><MailIcon /></IconBox>
          <div>
            <p className="text-[13px] text-mute">Email</p>
            <a
              href={`mailto:${contactInfo.email}`}
              aria-label={CONTACT.details.emailAria}
              className="text-base font-medium text-ink hover:text-cobalt"
            >
              {contactInfo.email}
            </a>
          </div>
        </li>
      </ul>

      <a
        href={`https://wa.me/${contactInfo.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={CONTACT.details.whatsappAria}
        onClick={() => track('whatsapp_click', { location: 'contact_section' })}
        className="mt-8 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-white transition-[filter] duration-200 hover:brightness-110"
      >
        <WhatsAppIcon />
        {CONTACT.details.whatsapp}
      </a>

      <p className="mt-6 text-sm text-mute">{CONTACT.details.availability}</p>
    </div>
  )
}

function IconBox({ children }: { children: React.ReactNode }) {
  return <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cobalt/10 text-cobalt">{children}</span>
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.58 3.6a1 1 0 0 1-.25 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-spin">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.05-1.32A10 10 0 1 0 12 2z" />
    </svg>
  )
}
