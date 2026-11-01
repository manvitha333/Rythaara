import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { type Product, type PackSize } from '@/data/products';

export type CartItem = {
  key: string;
  productId: string;
  packId: string;
  name: string;
  packLabel: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, pack: PackSize, quantity?: number) => void;
  remove: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'annadata-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add: CartContextValue['add'] = (product, pack, quantity = 1) => {
    const key = `${product.id}__${pack.id}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          packId: pack.id,
          name: product.name,
          packLabel: pack.label,
          price: pack.price,
          quantity,
          image: product.image,
        },
      ];
    });
    setIsOpen(true);
  };

  const remove: CartContextValue['remove'] = (key) =>
    setItems((prev) => prev.filter((i) => i.key !== key));

  const updateQuantity: CartContextValue['updateQuantity'] = (key, quantity) => {
    if (quantity <= 0) return remove(key);
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, quantity } : i)));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    add,
    remove,
    updateQuantity,
    clear,
    count,
    subtotal,
    isOpen,
    setIsOpen,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


