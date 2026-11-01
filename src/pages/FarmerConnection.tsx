import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Handshake, ShieldCheck, Package, Home as HomeIcon, MessageCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { brand, buildWhatsAppEnquiryLink } from '@/data/brand';

const heroImg = 'https://images.pexels.com/photos/11688197/pexels-photo-11688197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const portrait1 = 'https://images.pexels.com/photos/9268303/pexels-photo-9268303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const portrait2 = 'https://images.pexels.com/photos/20458054/pexels-photo-20458054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const portrait3 = 'https://images.pexels.com/photos/20527520/pexels-photo-20527520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const pillars = [
  {
    icon: Sprout,
    title: 'Farmers Grow',
    text: 'Farmers cultivate and harvest agricultural crops using practices suited to their land and region.',
  },
  {
    icon: Handshake,
    title: 'We Source Directly',
    text: 'We purchase from farmers directly wherever the supply arrangement allows, building relationships over transactions.',
  },
  {
    icon: ShieldCheck,
    title: 'We Check & Prepare',
    text: 'Products are checked, prepared, and packaged appropriately — with accurate labels and no unsupported claims.',
  },
  {
    icon: HomeIcon,
    title: 'Families Receive',
    text: 'Customers order online or through offline channels, and receive products closer to the people who grew them.',
  },
];

export default function FarmerConnection() {
  useReveal();
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center bg-forest-800 pt-24 text-cream-100">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Farmers harvesting in a field" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/70 to-forest-900/30" />
        </div>
        <div className="container-x relative">
          <div className="max-w-2xl">
            <p className="eyebrow text-turmeric-400">Farmer Connection</p>
            <h1 className="mt-4 font-display text-5xl font-600 leading-[1.08] text-cream-100 sm:text-6xl">
              The people behind every product.
            </h1>
            <p className="mt-5 text-lg text-cream-200/80">
              We aim to build meaningful market connections for farmers — not just buy from them.
              A more direct relationship between growers and customers is at the heart of what we do.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-cream-100 py-24">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">How the Connection Works</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              Four steps, one direct path.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="reveal hover-lift rounded-3xl border border-forest-800/8 bg-white/70 p-7"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-800 text-cream-100">
                  <p.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-600 text-forest-800">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-700/80">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portrait gallery */}
      <section className="bg-forest-50 py-24">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Faces of the Field</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              Farmers, not abstractions.
            </h2>
            <p className="mt-4 text-forest-700/70">
              These are illustrative photographs of Indian farmers. Replace them with images of
              the real farmers in your network as your partnerships grow.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[portrait1, portrait2, portrait3].map((img, i) => (
              <div
                key={i}
                className="reveal group overflow-hidden rounded-3xl"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={img}
                    alt="Indian farmer"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model restated */}
      <section className="bg-cream-100 py-24">
        <div className="container-x">
          <div className="reveal rounded-3xl bg-forest-800 p-10 text-center text-cream-100 sm:p-14">
            <Package className="mx-auto h-10 w-10 text-turmeric-400" />
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-600 leading-tight sm:text-4xl">
              Farmer → Our Brand → Customer
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-200/75">
              By sourcing directly from farmers, we aim to simplify the supply chain and build a
              closer relationship between growers and the people who buy their products.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/products" className="btn-turmeric">
                Shop Farm Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppEnquiryLink('partnering as a farmer')}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-forest-800"
              >
                <MessageCircle className="h-4 w-4" />
                Farmer? Talk to Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <p className="sr-only">{brand.promise}</p>
    </div>
  );
}
