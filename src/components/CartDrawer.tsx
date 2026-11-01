import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { buildWhatsAppOrderLink } from '@/data/brand';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, remove, subtotal, clear } = useCart();

  const orderLines = items.map(
    (i) => `• ${i.name} (${i.packLabel}) × ${i.quantity} — ₹${i.price * i.quantity}`
  );
  if (items.length > 0) {
    orderLines.push('', `Total: ₹${subtotal}`);
  }
  const whatsappLink = buildWhatsAppOrderLink(orderLines);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-forest-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream-100 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-forest-800/10 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-forest-800" />
            <h2 className="font-display text-lg font-600 text-forest-800">Your Basket</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest-700 transition-colors hover:bg-forest-800/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-800/5">
              <ShoppingBag className="h-7 w-7 text-forest-700/40" />
            </div>
            <p className="text-forest-700/70">Your basket is empty.</p>
            <Link
              to="/products"
              onClick={() => setIsOpen(false)}
              className="btn-primary"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 rounded-2xl border border-forest-800/8 bg-white/50 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-forest-800">{item.name}</h3>
                        <p className="text-xs text-forest-700/60">{item.packLabel}</p>
                      </div>
                      <button
                        onClick={() => remove(item.key)}
                        aria-label="Remove item"
                        className="text-forest-700/50 transition-colors hover:text-earth-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-forest-800/15 p-0.5">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-forest-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-forest-800">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clear}
                className="text-xs text-forest-700/50 underline transition-colors hover:text-earth-600"
              >
                Clear basket
              </button>
            </div>

            <div className="border-t border-forest-800/10 px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-forest-700/70">Subtotal</span>
                <span className="font-display text-xl font-600 text-forest-800">₹{subtotal}</span>
              </div>
              <p className="mt-1 text-xs text-forest-700/50">
                Checkout is via WhatsApp. We do not process payments on this site.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-forest-900 transition-transform active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                Place Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
