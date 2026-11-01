import { Link } from 'react-router-dom';
import { Plus, MessageCircle, CheckCircle2, XCircle } from 'lucide-react';
import { type Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppEnquiryLink } from '@/data/brand';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const firstPack = product.packs[0];
  const isSeasonal = product.category === 'Seasonal';
  const canOrder = product.status === 'active' && product.stockQuantity > 0;
  const outOfStock = product.status === 'out_of_stock';

  return (
    <article className="group hover-lift flex flex-col overflow-hidden rounded-xl border border-forest-800/8 bg-white/60 backdrop-blur-sm sm:rounded-3xl">
      <Link to={`/products/${product.slug}`} className="relative block overflow-hidden">
        {/* Mobile: compact square image / Desktop: 4/3 image */}
        <div className="aspect-square overflow-hidden sm:aspect-[4/3]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>
        {/* Mobile: compact category badge / Desktop: larger badge */}
        <span className="absolute left-2 top-2 rounded-full bg-cream-100/90 px-2 py-0.5 text-[10px] font-semibold text-forest-800 backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-xs">
          {product.category}
        </span>
      </Link>

      {/* Mobile: compact body / Desktop: full body */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-5">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-display font-600 text-forest-800 transition-colors group-hover:text-forest-900 line-clamp-2 text-sm leading-tight sm:line-clamp-none sm:text-xl">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 hidden text-sm text-forest-700/60 sm:block">{product.tagline}</p>

        <p className="mt-2 hidden text-sm leading-relaxed text-forest-700/80 sm:block">
          {product.shortDescription}
        </p>

        <div className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
          {product.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full bg-forest-800/5 px-2.5 py-1 text-[11px] font-medium text-forest-700"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Price + stock row */}
        <div className="mt-3 sm:mt-5 sm:flex sm:items-end sm:justify-between">
          <div>
            {/* Mobile: compact inline price / Desktop: "From" label */}
            <p className="hidden text-xs text-forest-700/50 sm:block">From</p>
            <p className="font-display font-600 text-forest-800 text-base sm:text-lg">
              {firstPack.price > 0 ? `₹${firstPack.price}` : 'Varies'}
              {firstPack.price > 0 && <span className="text-xs font-400 text-forest-700/50"> / {firstPack.label}</span>}
            </p>
          </div>

          {/* Mobile: inline stock indicator / Desktop: pack badges */}
          {outOfStock ? (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-earth-100/60 px-2 py-0.5 text-[10px] font-semibold text-earth-700 sm:mt-0 sm:hidden">
              <XCircle className="h-3 w-3" />
              Out of Stock
            </span>
          ) : (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-forest-100/60 px-2 py-0.5 text-[10px] font-semibold text-forest-600 sm:mt-0 sm:hidden">
              <CheckCircle2 className="h-3 w-3" />
              In Stock
            </span>
          )}
          <div className="hidden flex-wrap gap-1.5 text-[11px] text-forest-700/60 sm:flex">
            {product.packs.map((p) => (
              <span key={p.id} className="rounded-md border border-forest-800/10 px-1.5 py-0.5">
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop: out-of-stock message */}
        {outOfStock && (
          <p className="mt-4 hidden rounded-xl bg-earth-100/60 px-3 py-2 text-xs font-semibold text-earth-700 sm:block">
            Out of stock
          </p>
        )}

        {/* Actions */}
        <div className="mt-3 flex gap-2 sm:mt-5">
          {isSeasonal ? (
            <a
              href={buildWhatsAppEnquiryLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary flex-1 px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm"
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Enquire
            </a>
          ) : (
            <button
              onClick={() => add(product, firstPack)}
              disabled={!canOrder}
              className="btn-primary flex-1 px-3 py-2 text-xs disabled:cursor-not-allowed disabled:bg-forest-800/30 disabled:shadow-none sm:px-6 sm:py-3 sm:text-sm"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {canOrder ? (
                <>
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add to Cart</span>
                </>
              ) : (
                'Unavailable'
              )}
            </button>
          )}
          <Link
            to={`/products/${product.slug}`}
            className="btn-secondary px-3 py-2 text-xs sm:px-4 sm:py-3 sm:text-sm"
            aria-label={`View ${product.name} details`}
          >
            <span className="sm:hidden">View</span>
            <span className="hidden sm:inline">Details</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
