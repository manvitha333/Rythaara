import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sprout,
  ShieldCheck,
  Leaf,
  Truck,
  Handshake,
  Package,
  Home as HomeIcon,
  ChevronRight,
  Quote,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { brand } from '@/data/brand';

const heroImg =
  'https://images.pexels.com/photos/8184492/pexels-photo-8184492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const heroImg2 =
  'https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const kitchenImg =
  'https://images.pexels.com/photos/3531700/pexels-photo-3531700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const farmerPortrait =
  'https://images.pexels.com/photos/9268303/pexels-photo-9268303.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const dryingImg =
  'https://images.pexels.com/photos/20806405/pexels-photo-20806405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const packagingImg =
  'https://images.pexels.com/photos/9128871/pexels-photo-9128871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const qualityImg =
  'https://images.pexels.com/photos/17765437/pexels-photo-17765437.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const journeyFarmer =
  'https://images.pexels.com/photos/20445169/pexels-photo-20445169.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const journeySourcing =
  'https://images.pexels.com/photos/11688197/pexels-photo-11688197.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const journeyKitchen =
  'https://images.pexels.com/photos/37330104/pexels-photo-37330104.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const journeySteps = [
  { icon: Sprout, label: 'Farmer', sub: 'Cultivates & harvests' },
  { icon: Handshake, label: 'Direct Sourcing', sub: 'We buy from farmers' },
  { icon: ShieldCheck, label: 'Quality Checks', sub: 'Checked & prepared' },
  { icon: HomeIcon, label: 'Your Home', sub: 'Delivered to you' },
];

const journeyDetail = [
  {
    n: '01',
    title: 'The Farmer',
    img: journeyFarmer,
    text: 'Products begin with farmers who cultivate and harvest agricultural crops across India.',
  },
  {
    n: '02',
    title: 'Direct Sourcing',
    img: journeySourcing,
    text: 'We purchase from farmers directly wherever the supply arrangement allows.',
  },
  {
    n: '03',
    title: 'Quality & Verification',
    img: qualityImg,
    text: 'Products are checked and prepared appropriately. Spices may be ground and packaged by a suitable food-processing partner.',
  },
  {
    n: '04',
    title: 'Honest Packaging',
    img: packagingImg,
    text: 'Products receive appropriate, compliant packaging and accurate labels, with no unsupported claims.',
  },
  {
    n: '05',
    title: 'Your Kitchen',
    img: journeyKitchen,
    text: 'Customers can order online or purchase through our offline sales channels.',
  },
];

export default function Home() {
  useReveal();
  const { products } = useProducts();

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen bg-forest-800 text-cream-100">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Indian farmer in a turmeric field"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/70 to-forest-900/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-forest-900/40" />
        </div>

        <div className="container-x relative flex min-h-screen flex-col justify-center pt-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream-100/20 bg-cream-100/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-turmeric-400 backdrop-blur-sm">
              <Sprout className="h-3.5 w-3.5" />
              Farmer to Customer
            </span>

            <h1 className="mt-6 font-display text-5xl font-600 leading-[1.05] text-cream-100 sm:text-6xl lg:text-7xl">
              The Farmer Grows It.
              <br />
              <span className="text-turmeric-400">We Bring It to You.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-200/80">
              Good agricultural products shouldn't need unnecessary middlemen to reach your
              kitchen. We source directly from farmers, take care with quality and handling,
              and bring farm products closer to the families who use them every day.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/products" className="btn-turmeric">
                Explore Our Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary border-cream-100/30 text-cream-100 hover:bg-cream-100 hover:text-forest-800">
                See How It Works
              </a>
            </div>

            {/* Visual journey strip */}
            <div className="mt-14 hidden items-center gap-2 sm:flex">
              {journeySteps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div className="flex items-center gap-2.5 rounded-2xl border border-cream-100/15 bg-forest-900/40 px-3.5 py-2.5 backdrop-blur-sm">
                    <s.icon className="h-4 w-4 text-turmeric-400" />
                    <div>
                      <p className="text-xs font-semibold text-cream-100">{s.label}</p>
                      <p className="text-[10px] text-cream-200/60">{s.sub}</p>
                    </div>
                  </div>
                  {i < journeySteps.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-cream-100/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND MESSAGE BAR ===== */}
      <section className="bg-cream-100 py-6">
        <div className="container-x">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-around sm:gap-0">
            {[
              { icon: Handshake, text: 'Direct Farmer-to-Customer Sourcing' },
              { icon: Leaf, text: 'No Added Synthetic Colours*' },
              { icon: ShieldCheck, text: 'Quality-Focused Products' },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800/8 text-forest-800">
                  <t.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-semibold text-forest-800">{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BUY THROUGH US ===== */}
      <section className="bg-cream-100 py-24 grain-overlay">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Why Buy Through Us</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              A more direct way to buy farm products.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Handshake,
                title: 'Direct from Farmers',
                text: 'We build direct relationships with farmers and source agricultural products from them, helping reduce unnecessary layers in the supply chain.',
                img: farmerPortrait,
              },
              {
                icon: Leaf,
                title: 'No Added Synthetic Colours',
                text: 'We aim to offer products without added synthetic colours, supported by appropriate supplier declarations, ingredient information, and verification.',
                img: 'https://images.pexels.com/photos/6220707/pexels-photo-6220707.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
              },
              {
                icon: ShieldCheck,
                title: 'Quality Over Compromise',
                text: 'We focus on careful sourcing, suitable processing, hygienic handling, and clear product information.',
                img: qualityImg,
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="reveal hover-lift group flex flex-col overflow-hidden rounded-3xl border border-forest-800/8 bg-white/70"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest-800 text-cream-100">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-600 text-forest-800">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-forest-700/80">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON ===== */}
      <section className="bg-forest-50 py-24">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">The Comparison</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              A More Direct Way to Buy Farm Products.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {/* Conventional */}
            <div className="reveal rounded-3xl border border-earth-400/20 bg-cream-200/50 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-earth-500">
                Conventional Supply Chain
              </p>
              <h3 className="mt-2 font-display text-2xl font-600 text-earth-600">
                Multiple intermediaries may add complexity and cost.
              </h3>
              <div className="mt-8 flex flex-col gap-3">
                {['Farmer', 'Local Aggregator', 'Wholesaler', 'Distributor', 'Retailer', 'Customer'].map(
                  (step, i, arr) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-400/15 text-xs font-bold text-earth-600">
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium text-earth-600/80">{step}</span>
                      {i < arr.length - 1 && (
                        <span className="ml-auto text-earth-400/40">↓</span>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Our model */}
            <div className="reveal rounded-3xl border border-forest-500/30 bg-forest-800 p-8 text-cream-100">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric-400">
                Our Direct Model
              </p>
              <h3 className="mt-2 font-display text-2xl font-600 text-cream-100">
                Farmer → Our Brand → Customer
              </h3>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  { icon: Sprout, label: 'Farmer' },
                  { icon: Package, label: 'Our Brand' },
                  { icon: HomeIcon, label: 'Customer' },
                ].map((s, i, arr) => (
                  <div key={s.label}>
                    <div className="flex items-center gap-3 rounded-2xl bg-forest-900/40 px-4 py-3.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-turmeric-500 text-forest-900">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-cream-100">{s.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="ml-8 h-4 w-0.5 bg-turmeric-500/40" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="reveal mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-forest-700/70">
            By sourcing directly from farmers, we aim to simplify the supply chain and build a
            closer relationship between growers and the people who buy their products. We do not
            claim that every conventional supply chain is inefficient or that our products are
            always cheaper.
          </p>
        </div>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="bg-cream-100 py-24">
        <div className="container-x">
          <div className="reveal flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">Our Products</p>
              <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
                Grown by farmers. Chosen for your kitchen.
              </h2>
            </div>
            <Link to="/products" className="btn-secondary shrink-0">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {products.slice(0, 6).map((p, i) => (
              <div
                key={p.id}
                className="reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== JOURNEY ===== */}
      <section id="how-it-works" className="bg-forest-50 py-24">
        <div className="container-x">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">The Real Journey</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              From a farmer's field to your kitchen.
            </h2>
            <p className="mt-4 text-forest-700/70">
              Every product follows a clear, honest path — no hidden steps, no unsupported claims.
            </p>
          </div>

          <div className="mt-14 space-y-6">
            {journeyDetail.map((step, i) => (
              <div
                key={step.n}
                className={`reveal flex flex-col gap-6 overflow-hidden rounded-3xl border border-forest-800/8 bg-white/60 md:flex-row ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="md:w-2/5">
                  <div className="aspect-[16/10] h-full overflow-hidden md:aspect-auto">
                    <img
                      src={step.img}
                      alt={step.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 md:p-10">
                  <span className="font-display text-5xl font-600 text-turmeric-500/30">{step.n}</span>
                  <h3 className="mt-2 font-display text-2xl font-600 text-forest-800">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest-700/80">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND PROMISE (dark) ===== */}
      <section className="relative bg-forest-900 py-28 text-cream-100">
        <div className="absolute inset-0 opacity-20">
          <img src={dryingImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-forest-900" />
        </div>
        <div className="container-x relative">
          <div className="reveal mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-turmeric-400/50" />
            <h2 className="mt-6 font-display text-4xl font-600 leading-tight text-cream-100 sm:text-5xl">
              Not Just Products. A More Direct Connection to the People Who Grow Our Food.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-cream-200/75">
              We believe customers deserve clear product information, farmers deserve meaningful
              market connections, and good agricultural products deserve careful handling. Our
              mission is to bring these three things together through a more direct
              farm-to-customer business.
            </p>
            <Link to="/products" className="btn-turmeric mt-9">
              Shop Farm Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUPPORTING HEADLINE / KITCHEN ===== */}
      <section className="bg-cream-100 py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={kitchenImg}
                alt="Hands preparing Indian food with spices"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="reveal">
            <p className="eyebrow">Our Promise</p>
            <h2 className="mt-3 font-display text-4xl font-600 text-forest-800 sm:text-5xl">
              {brand.tagline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-forest-700/80">
              We bring agricultural products directly from Indian farmers to your home, reducing
              unnecessary middlemen and focusing on honest sourcing, quality, and naturally
              characteristic colours.
            </p>
            <div className="mt-7 space-y-3">
              {[
                { icon: Truck, t: 'Direct sourcing from farmers across India' },
                { icon: Leaf, t: 'Products without added synthetic colours, where verified' },
                { icon: ShieldCheck, t: 'Quality checks and hygienic handling' },
              ].map((row) => (
                <div key={row.t} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-800/8 text-forest-800">
                    <row.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-medium text-forest-800">{row.t}</span>
                </div>
              ))}
            </div>
            <Link to="/our-story" className="btn-primary mt-8">
              Read Our Story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
