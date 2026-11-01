import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Handshake, ShieldCheck, Package, Home as HomeIcon, Leaf } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { brand } from '@/data/brand';

const heroImg = 'https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const storyImg = 'https://images.pexels.com/photos/20527461/pexels-photo-20527461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const fieldImg = 'https://images.pexels.com/photos/20317193/pexels-photo-20317193.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const promiseImg = 'https://images.pexels.com/photos/20806405/pexels-photo-20806405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const values = [
  {
    icon: Handshake,
    title: 'Direct Relationships',
    text: 'We build direct relationships with farmers and source from them, helping reduce unnecessary layers in the supply chain.',
  },
  {
    icon: Leaf,
    title: 'Honest Claims',
    text: 'We aim to offer products without added synthetic colours where verified, and we do not make claims we cannot substantiate.',
  },
  {
    icon: ShieldCheck,
    title: 'Careful Handling',
    text: 'We focus on suitable processing, hygienic handling, and clear product information on every pack.',
  },
];

export default function OurStory() {
  useReveal();
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center bg-forest-800 pt-24 text-cream-100">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Indian farmers harvesting" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/70 to-forest-900/30" />
        </div>
        <div className="container-x relative">
          <div className="max-w-2xl">
            <p className="eyebrow text-turmeric-400">Our Story</p>
            <h1 className="mt-4 font-display text-5xl font-600 leading-[1.08] text-cream-100 sm:text-6xl">
              A more direct connection between growers and families.
            </h1>
            <p className="mt-5 text-lg text-cream-200/80">
              {brand.promise}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-cream-100 py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <div className="overflow-hidden rounded-3xl">
              <img src={storyImg} alt="Indian farmers at work" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
          <div className="reveal">
            <p className="eyebrow">Why We Started</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800">
              Good products shouldn't get lost in the middle.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-forest-700/80">
              <p>
                In many conventional supply chains, agricultural products pass through several
                intermediaries before reaching a customer. Each layer can add complexity, and the
                connection between the farmer and the person who finally uses the product can
                become distant.
              </p>
              <p>
                We started {brand.name} to try a more direct approach — sourcing agricultural
                products from farmers and bringing them to customers under our own brand, with
                attention to quality, handling, and honest information.
              </p>
              <p>
                We do not claim to have solved every problem in the supply chain. But we believe
                that a shorter, clearer path from farmer to customer is worth building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-forest-50 py-24">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">What Guides Us</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              Three commitments we work to keep.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal hover-lift rounded-3xl border border-forest-800/8 bg-white/70 p-7"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-800 text-cream-100">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-600 text-forest-800">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-forest-700/80">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Model strip */}
      <section className="bg-cream-100 py-24">
        <div className="container-x">
          <div className="reveal overflow-hidden rounded-3xl">
            <img src={fieldImg} alt="Farmer carrying harvested crops" className="aspect-[21/9] w-full object-cover" />
          </div>
          <div className="reveal mx-auto mt-10 max-w-3xl text-center">
            <h2 className="font-display text-3xl font-600 text-forest-800 sm:text-4xl">
              Our model, in three steps.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
              {[
                { icon: Sprout, label: 'Farmer' },
                { icon: Package, label: 'Our Brand' },
                { icon: HomeIcon, label: 'Customer' },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-2.5 rounded-2xl bg-forest-800 px-5 py-3 text-cream-100">
                    <s.icon className="h-5 w-5 text-turmeric-400" />
                    <span className="font-semibold">{s.label}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight className="h-5 w-5 text-turmeric-500" />}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-forest-700/70">
              By sourcing directly from farmers, we aim to simplify the supply chain — without
              claiming that every conventional supply chain is inefficient or that our products
              are always cheaper.
            </p>
          </div>
        </div>
      </section>

      {/* Promise CTA */}
      <section className="relative bg-forest-900 py-24 text-cream-100">
        <div className="absolute inset-0 opacity-15">
          <img src={promiseImg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container-x relative text-center">
          <h2 className="reveal mx-auto max-w-2xl font-display text-3xl font-600 leading-tight sm:text-4xl">
            {brand.tagline}
          </h2>
          <Link to="/products" className="btn-turmeric mt-8">
            Shop Farm Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
