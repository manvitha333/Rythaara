import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { brand, buildWhatsAppEnquiryLink } from '@/data/brand';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-cream-200">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-100 text-forest-800">
                <Sprout className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-600 tracking-tightest text-cream-100">
                  {brand.name}
                </span>
                <span className="mt-1 text-[9px] font-medium tracking-wide text-cream-200/70">
                  {brand.tagline}
                </span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-cream-200/70">
              {brand.promise}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-turmeric-400">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/our-story', label: 'Our Story' },
                { to: '/products', label: 'Products' },
                { to: '/farmer-connection', label: 'Farmer Connection' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-cream-200/70 transition-colors hover:text-turmeric-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-turmeric-400">
              Trust
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream-200/70">
              <li>Direct Farmer-to-Customer Sourcing</li>
              <li>No Added Synthetic Colours*</li>
              <li>Quality-Focused Products</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-turmeric-400">
              Reach Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-cream-200/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-turmeric-400" />
                {brand.address}
              </li>
              <li className="flex items-center gap-2.5 text-cream-200/70">
                <Phone className="h-4 w-4 shrink-0 text-turmeric-400" />
                {brand.phone}
              </li>
              <li className="flex items-center gap-2.5 text-cream-200/70">
                <Mail className="h-4 w-4 shrink-0 text-turmeric-400" />
                {brand.email}
              </li>
              <li>
                <a
                  href={buildWhatsAppEnquiryLink('your products')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-cream-200/70 transition-colors hover:text-turmeric-400"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-turmeric-400" />
                  Enquire on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-cream-200/10 pt-8">
          <p className="text-xs leading-relaxed text-cream-200/50">
            *Product claims apply only to products verified to meet the stated specifications.
            We do not claim that every product is chemical-free, organic, pesticide-free, or
            completely unprocessed unless the relevant claims are substantiated. Prices shown
            are placeholders and should be replaced with actual selling prices.
          </p>
          <p className="mt-4 text-xs text-cream-200/50">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
