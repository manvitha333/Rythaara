import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/data/products';
import { useProducts } from '@/context/ProductContext';

export default function Products() {
  useReveal();
  const [query, setQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string>('All');
  const { products, loading, error } = useProducts();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCat === 'All' || p.category === activeCat;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery && p.status !== 'hidden';
    });
  }, [products, query, activeCat]);

  const cats = ['All', ...categories];

  return (
    <div className="overflow-hidden bg-cream-100 pt-24">
      {/* Header */}
      <section className="bg-forest-50 py-16">
        <div className="container-x">
          <p className="eyebrow">Our Products</p>
          <h1 className="mt-3 font-display text-5xl font-600 text-forest-800 sm:text-6xl">
            Searchable catalogue
          </h1>
          <p className="mt-4 max-w-xl text-forest-700/70">
            Turmeric, red chilli, pulses, cashews and more — sourced directly from farmers,
            without added synthetic colours where verified.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-forest-700/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, e.g. turmeric, dal, cashew…"
                className="w-full rounded-full border border-forest-800/15 bg-white/80 py-3.5 pl-12 pr-4 text-sm text-forest-800 outline-none transition-all placeholder:text-forest-700/40 focus:border-forest-800 focus:ring-2 focus:ring-forest-800/10"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCat === c
                    ? 'bg-forest-800 text-cream-100'
                    : 'border border-forest-800/15 text-forest-700 hover:border-forest-800 hover:text-forest-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container-x">
          {loading ? (
            <div className="rounded-3xl border border-forest-800/8 bg-white/50 py-20 text-center text-forest-700/70">Loading products…</div>
          ) : error ? (
            <div className="rounded-3xl border border-earth-400/30 bg-earth-100/30 py-20 text-center text-earth-700">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-forest-800/8 bg-white/50 py-20 text-center">
              <p className="text-forest-700/70">No products match your search.</p>
              <button
                onClick={() => {
                  setQuery('');
                  setActiveCat('All');
                }}
                className="btn-secondary mt-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
