import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, MessageCircle, Check, Sprout, ShieldCheck, Leaf, Package, CheckCircle2, XCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppEnquiryLink } from '@/data/brand';
import ProductCard from '@/components/ProductCard';


export default function ProductDetail() {
  useReveal();
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();
  const product = products.find((item) => item.slug === slug);
  const { add } = useCart();
  const [selectedPackId, setSelectedPackId] = useState(product?.packs[0]?.id ?? '');
  const [qty, setQty] = useState(1);

  if (loading) return <div className="min-h-screen bg-cream-100 px-6 pt-32 text-center text-forest-700/70">Loading product…</div>;
  if (!product || product.status === 'hidden') return <Navigate to="/products" replace />;

  const pack = product.packs.find((p) => p.id === selectedPackId) ?? product.packs[0];
  const isSeasonal = product.category === 'Seasonal';
  const gallery = [product.image, ...(product.gallery ?? [])];
  const outOfStock = product.status === 'out_of_stock';
  const inStock = product.status === 'active' && product.stockQuantity > 0;

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 3);
  const relatedItems = related.length > 0 ? related : fallback;

  return (
    <div className="overflow-hidden bg-cream-100 pt-24">
      <div className="container-x py-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-700/70 transition-colors hover:text-forest-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="reveal">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {gallery.slice(0, 3).map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-xl">
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      loading="lazy"
                      className="aspect-square w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="reveal">
            {/* Category + name + tagline */}
            <span className="rounded-full bg-forest-800/8 px-3 py-1 text-xs font-semibold text-forest-800">
              {product.category}
            </span>
            <h1 className="mt-4 font-display text-3xl font-600 text-forest-800 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-base text-forest-700/70 sm:text-lg">{product.tagline}</p>

            {/* Mobile: stock + price first */}
            <div className="mt-4 flex items-center justify-between sm:hidden">
              <p className="font-display text-2xl font-600 text-forest-800">
                {pack.price > 0 ? `₹${pack.price}` : 'Varies'}
              </p>
              {outOfStock ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-earth-100/60 px-2.5 py-1 text-xs font-semibold text-earth-700">
                  <XCircle className="h-3.5 w-3.5" />
                  Out of Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-forest-100/60 px-2.5 py-1 text-xs font-semibold text-forest-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  In Stock
                </span>
              )}
            </div>

            {/* Mobile: pack selection compact */}
            {!isSeasonal && inStock && (
              <div className="mt-4 sm:hidden">
                <p className="text-xs font-semibold text-forest-800">Pack size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.packs.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPackId(p.id)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedPackId === p.id
                          ? 'border-forest-800 bg-forest-800 text-cream-100'
                          : 'border-forest-800/15 text-forest-700 hover:border-forest-800'
                      }`}
                    >
                      {p.label} — ₹{p.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile: quantity + Add to Cart */}
            {!isSeasonal && (
              <div className="mt-4 flex items-center gap-3 sm:hidden">
                <div className="flex items-center gap-1 rounded-full border border-forest-800/15 p-0.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold text-forest-800">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button onClick={() => add(product, pack, qty)} className="btn-primary flex-1 px-4 py-2.5 text-sm">
                  <Plus className="h-4 w-4" />
                  Add — ₹{pack.price * qty}
                </button>
              </div>
            )}

            {isSeasonal && product.status === 'active' && (
              <a
                href={buildWhatsAppEnquiryLink(product.name)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-4 sm:hidden"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
            )}

            {outOfStock && (
              <div className="mt-4 rounded-xl border border-earth-400/30 bg-earth-100/40 px-3 py-2 text-xs font-semibold text-earth-700 sm:hidden">
                Out of stock — ordering is temporarily unavailable.
              </div>
            )}

            {/* Description — desktop: right after tagline / mobile: after Add to Cart */}
            <p className="mt-6 text-base leading-relaxed text-forest-700/85 sm:mt-5">
              {product.description}
            </p>

            {/* Highlights */}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest-800/5 px-3 py-1.5 text-xs font-medium text-forest-700"
                >
                  <Check className="h-3.5 w-3.5 text-forest-600" />
                  {h}
                </span>
              ))}
            </div>

            {/* Desktop: pack selection */}
            {!isSeasonal && inStock && (
              <div className="mt-8 hidden sm:block">
                <p className="text-sm font-semibold text-forest-800">Select pack size</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.packs.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPackId(p.id)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                        selectedPackId === p.id
                          ? 'border-forest-800 bg-forest-800 text-cream-100'
                          : 'border-forest-800/15 text-forest-700 hover:border-forest-800'
                      }`}
                    >
                      {p.label} — ₹{p.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Desktop: quantity + actions */}
            {!isSeasonal && (
              <div className="mt-8 hidden flex-wrap items-center gap-4 sm:flex">
                <div className="flex items-center gap-1 rounded-full border border-forest-800/15 p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-forest-800">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button onClick={() => add(product, pack, qty)} className="btn-primary flex-1 min-w-[180px]">
                  <Plus className="h-4 w-4" />
                  Add to Cart — ₹{pack.price * qty}
                </button>
              </div>
            )}

            {/* Desktop: seasonal enquiry */}
            {isSeasonal && product.status === 'active' && (
              <a
                href={buildWhatsAppEnquiryLink(product.name)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 hidden sm:inline-flex"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
            )}

            {/* Desktop: out of stock */}
            {outOfStock && (
              <div className="mt-8 hidden rounded-2xl border border-earth-400/30 bg-earth-100/40 px-4 py-3 text-sm font-semibold text-earth-700 sm:block">
                Out of stock — ordering is temporarily unavailable.
              </div>
            )}

            {/* Info rows */}
            <div className="mt-8 space-y-4 rounded-2xl border border-forest-800/8 bg-white/60 p-5 sm:mt-10 sm:p-6">
              {[
                { icon: Sprout, label: 'Sourcing', value: product.sourcing },
                { icon: Package, label: 'Processing', value: product.processing },
                { icon: Leaf, label: 'Ingredients', value: product.ingredients },
                { icon: ShieldCheck, label: 'Synthetic Colour Claim', value: product.syntheticColourClaim },
              ].map((row) => (
                <div key={row.label} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest-800/8 text-forest-800">
                    <row.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-forest-700/50">
                      {row.label}
                    </p>
                    <p className="text-sm text-forest-700/85">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-forest-700/50">
              *Product claims apply only to products verified to meet the stated specifications.
              Prices are maintained by RYTHARA and may change.
            </p>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16 sm:mt-20">
          <h2 className="font-display text-2xl font-600 text-forest-800 sm:text-3xl">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-6 lg:grid-cols-3">
            {relatedItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
