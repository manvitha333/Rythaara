export type PackSize = {
  id: string;
  label: string;
  price: number;
};

export type ProductStatus = 'active' | 'hidden' | 'out_of_stock';

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  sourcing: string;
  processing: string;
  ingredients: string;
  syntheticColourClaim: string;
  packs: PackSize[];
  highlights: string[];
  price: number;
  unit: string;
  stockQuantity: number;
  status: ProductStatus;
};

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  short_description: string;
  description: string;
  category: string;
  image: string;
  gallery: unknown;
  price: number;
  unit: string;
  stock_quantity: number;
  status: ProductStatus;
  details: unknown;
  packs: unknown;
};

type ProductDetails = {
  sourcing?: string;
  processing?: string;
  ingredients?: string;
  syntheticColourClaim?: string;
  highlights?: string[];
};

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const asPacks = (value: unknown): PackSize[] => {
  if (!Array.isArray(value)) return [];
  return value.filter((pack): pack is PackSize => {
    if (!pack || typeof pack !== 'object') return false;
    const candidate = pack as Record<string, unknown>;
    return typeof candidate.id === 'string' && typeof candidate.label === 'string' && typeof candidate.price === 'number';
  });
};

export const toProduct = (row: ProductRow): Product => {
  const details = row.details && typeof row.details === 'object' ? (row.details as ProductDetails) : {};
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    category: row.category,
    image: row.image,
    gallery: asStringArray(row.gallery),
    shortDescription: row.short_description,
    description: row.description,
    sourcing: details.sourcing ?? '',
    processing: details.processing ?? '',
    ingredients: details.ingredients ?? '',
    syntheticColourClaim: details.syntheticColourClaim ?? '',
    packs: asPacks(row.packs),
    highlights: asStringArray(details.highlights),
    price: Number(row.price),
    unit: row.unit,
    stockQuantity: row.stock_quantity,
    status: row.status,
  };
};

export const categories = ['Spices', 'Pulses', 'Nuts', 'Seasonal'];
