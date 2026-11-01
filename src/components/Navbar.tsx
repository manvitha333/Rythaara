import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/context/CartContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/products', label: 'Products' },
  { to: '/farmer-connection', label: 'Farmer Connection' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(23,61,43,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-forest-800'
                    : 'text-forest-700/70 hover:text-forest-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-turmeric-500 transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            to="/products"
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-turmeric-500 px-1 text-[11px] font-bold text-forest-900">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest-800 transition-colors hover:bg-forest-800/10 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-forest-800/10 bg-cream-100 transition-[max-height,opacity] duration-300 md:hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive ? 'bg-forest-800 text-cream-100' : 'text-forest-800 hover:bg-forest-800/5'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
