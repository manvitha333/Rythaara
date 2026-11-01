import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { brand, buildWhatsAppEnquiryLink } from '@/data/brand';

export default function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend — we surface the message via WhatsApp so nothing is silently lost.
    const text = `New enquiry from ${form.name} (${form.email}):\n${form.message}`;
    window.open(buildWhatsAppEnquiryLink(text), '_blank');
    setSent(true);
  };

  return (
    <div className="overflow-hidden bg-cream-100 pt-24">
      <section className="bg-forest-50 py-16">
        <div className="container-x">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 font-display text-5xl font-600 text-forest-800 sm:text-6xl">
            Let's talk.
          </h1>
          <p className="mt-4 max-w-xl text-forest-700/70">
            Questions about products, orders, or partnering as a farmer? Reach us through the
            form below or directly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div className="reveal rounded-3xl border border-forest-800/8 bg-white/70 p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-forest-600" />
                <h2 className="font-display text-2xl font-600 text-forest-800">Message ready on WhatsApp</h2>
                <p className="max-w-sm text-sm text-forest-700/70">
                  We opened WhatsApp with your message pre-filled. Press send there to reach us.
                  Replace the WhatsApp number in the brand settings with your real number.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: '', email: '', message: '' });
                  }}
                  className="btn-secondary mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-forest-800">Name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-forest-800/15 bg-cream-100/50 px-4 py-3 text-sm text-forest-800 outline-none transition-all focus:border-forest-800 focus:ring-2 focus:ring-forest-800/10"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-forest-800">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-forest-800/15 bg-cream-100/50 px-4 py-3 text-sm text-forest-800 outline-none transition-all focus:border-forest-800 focus:ring-2 focus:ring-forest-800/10"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-forest-800">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-1.5 w-full resize-none rounded-xl border border-forest-800/15 bg-cream-100/50 px-4 py-3 text-sm text-forest-800 outline-none transition-all focus:border-forest-800 focus:ring-2 focus:ring-forest-800/10"
                    placeholder="How can we help?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </button>
                <p className="text-xs text-forest-700/50">
                  This form does not store data or process payments. It opens WhatsApp with your
                  message pre-filled.
                </p>
              </form>
            )}
          </div>

          {/* Details */}
          <div className="reveal space-y-4">
            <div className="rounded-3xl border border-forest-800/8 bg-white/70 p-7">
              <h2 className="font-display text-xl font-600 text-forest-800">Reach us directly</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-800/8 text-forest-800">
                    <MapPin className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-forest-700/50">Address</p>
                    <p className="text-forest-700/85">{brand.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-800/8 text-forest-800">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-forest-700/50">Phone</p>
                    <p className="text-forest-700/85">{brand.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-800/8 text-forest-800">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-forest-700/50">Email</p>
                    <p className="text-forest-700/85">{brand.email}</p>
                  </div>
                </li>
                <li>
                  <a
                    href={buildWhatsAppEnquiryLink('a general enquiry')}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-forest-900 transition-transform active:scale-95"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-forest-800 p-7 text-cream-100">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric-400">
                Our Promise
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream-200/85">
                {brand.promise}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
