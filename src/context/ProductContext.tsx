import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { toProduct, type Product, type ProductRow } from '@/data/products';

type ProductContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });
    if (queryError) {
      console.error('public products load failed', queryError);
      setError('Products are temporarily unavailable. Please try again.');
      setProducts([]);
    } else {
      setError(null);
      setProducts((data as ProductRow[]).map(toProduct));
    }
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        void refresh();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <ProductContext.Provider value={{ products, loading, error, refresh }}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}
