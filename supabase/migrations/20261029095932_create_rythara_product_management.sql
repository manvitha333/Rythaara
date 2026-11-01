/*
# Create RYTHARA product management catalogue

1. New Tables
- `admin_users` — marks which authenticated Supabase accounts may manage products.
- `products` — persistent catalogue records used by both the public storefront and admin dashboard.
- `products.id` — stable text identifier used by existing product URLs and cart references.
- `products.slug` — public URL slug.
- `products.name`, `tagline`, `short_description`, `description` — customer-facing product copy.
- `products.category` — catalogue category.
- `products.image`, `gallery` — product image URLs.
- `products.price`, `unit` — the management price and unit shown to customers.
- `products.stock_quantity` — available stock quantity.
- `products.status` — `active`, `hidden`, or `out_of_stock`.
- `products.details` — optional structured product details such as sourcing and ingredients.
- `products.packs` — optional pack-size and pack-price choices for existing ordering flows.
- `products.created_at`, `updated_at` — record timestamps.

2. Seed Data
- Copies the existing RYTHARA catalogue into `products`, including current images, descriptions, pack prices, and pricing units.

3. Security
- Enables row-level security on both tables.
- Public visitors may read only products whose status is `active` or `out_of_stock`.
- Only authenticated users listed in `admin_users` may read all products or create, update, and delete products.
- No public registration or client-side admin-role assignment is provided. The first administrator must be added to `admin_users` by an operator after creating an account in Supabase Auth.
- Admin membership is read-only from the browser and cannot be granted or changed through the product dashboard.

4. Important Notes
- Hidden products remain stored and can be reactivated later.
- Out-of-stock products remain publicly visible, while the storefront disables ordering for them.
- Product deletion is permanent and is intentionally available only to authorized administrators.
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL,
  image text NOT NULL,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  price numeric(12,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  unit text NOT NULL DEFAULT 'kg',
  stock_quantity integer NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'out_of_stock')),
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  packs jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_status_idx ON public.products(status);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO anon, authenticated;

DROP POLICY IF EXISTS "Admins can see their own membership" ON public.admin_users;
CREATE POLICY "Admins can see their own membership"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Public can see visible products" ON public.products;
CREATE POLICY "Public can see visible products"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (status IN ('active', 'out_of_stock'));

DROP POLICY IF EXISTS "Admins can see every product" ON public.products;
CREATE POLICY "Admins can see every product"
  ON public.products FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can create products" ON public.products;
CREATE POLICY "Admins can create products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

INSERT INTO public.products (id, slug, name, tagline, short_description, description, category, image, gallery, price, unit, stock_quantity, status, details, packs)
VALUES
('turmeric-powder', 'turmeric-powder', 'Turmeric Powder', 'Naturally golden, ground with care', 'Naturally golden turmeric with its characteristic colour — no added synthetic colourants where verified.', 'Our turmeric powder is sourced directly from farmers who cultivate and harvest turmeric with traditional care. The rhizomes are cleaned, dried, and ground by a suitable food-processing partner, preserving the naturally golden colour and aroma turmeric is known for.', 'Spices', 'https://images.pexels.com/photos/6220707/pexels-photo-6220707.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["https://images.pexels.com/photos/6220709/pexels-photo-6220709.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/6220710/pexels-photo-6220710.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/15623115/pexels-photo-15623115.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb, 300, 'kg', 100, 'active', '{"sourcing":"Sourced directly from turmeric-growing farmers wherever the supply arrangement allows.","processing":"Cleaned, sun-dried, and ground by a suitable food-processing partner. Packaged under hygienic conditions.","ingredients":"Turmeric (Curcuma longa). No added synthetic colours where verified.","syntheticColourClaim":"No added synthetic colourants where verified.","highlights":["Naturally golden","Directly sourced","No added synthetic colour*"]}'::jsonb, '[{"id":"tur-100","label":"100 g","price":30},{"id":"tur-200","label":"200 g","price":60},{"id":"tur-500","label":"500 g","price":150},{"id":"tur-1kg","label":"1 kg","price":300}]'::jsonb),
('red-chilli-powder', 'red-chilli-powder', 'Red Chilli Powder', 'Authentic colour and aroma', 'Authentic chilli colour and aroma — without added synthetic colourants where verified.', 'Red chilli powder made from carefully sourced chillies, ground to preserve the natural colour and aroma. We work with farmers directly wherever the supply arrangement allows, and the chillies are processed by a suitable food-processing partner.', 'Spices', 'https://images.pexels.com/photos/33440713/pexels-photo-33440713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["https://images.pexels.com/photos/33440709/pexels-photo-33440709.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/33440711/pexels-photo-33440711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/6902055/pexels-photo-6902055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb, 400, 'kg', 100, 'active', '{"sourcing":"Sourced directly from chilli-growing farmers wherever the supply arrangement allows.","processing":"Cleaned, dried, and ground by a suitable food-processing partner. Hygienic packaging.","ingredients":"Red chilli (Capsicum annuum). No added synthetic colours where verified.","syntheticColourClaim":"No added synthetic colourants where verified.","highlights":["Authentic aroma","Directly sourced","No added synthetic colour*"]}'::jsonb, '[{"id":"chilli-100","label":"100 g","price":40},{"id":"chilli-200","label":"200 g","price":80},{"id":"chilli-500","label":"500 g","price":200},{"id":"chilli-1kg","label":"1 kg","price":400}]'::jsonb),
('black-gram', 'black-gram', 'Black Gram (Urad Dal)', 'Carefully sourced whole pulses', 'Carefully sourced whole black gram, cleaned and sorted for everyday Indian cooking.', 'Black gram (urad dal) is a staple in Indian kitchens. We source whole pulses directly from farmers, clean and sort them, and package them under hygienic conditions so they reach your kitchen ready to use.', 'Pulses', 'https://images.pexels.com/photos/31672561/pexels-photo-31672561.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["https://images.pexels.com/photos/31672561/pexels-photo-31672561.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/30204265/pexels-photo-30204265.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/36008676/pexels-photo-36008676.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb, 150, 'kg', 100, 'active', '{"sourcing":"Sourced directly from pulse-growing farmers wherever the supply arrangement allows.","processing":"Cleaned, sorted, and packaged under hygienic conditions.","ingredients":"Black gram (Vigna mungo). Whole.","syntheticColourClaim":"No added synthetic colours.","highlights":["Carefully cleaned","Directly sourced","Whole pulses"]}'::jsonb, '[{"id":"urad-500","label":"500 g","price":75},{"id":"urad-1kg","label":"1 kg","price":150}]'::jsonb),
('red-gram', 'red-gram', 'Red Gram (Toor Dal)', 'Everyday pulses for Indian cooking', 'Everyday split red gram (toor dal), carefully sourced and cleaned for daily meals.', 'Red gram (toor dal) is one of the most commonly used pulses in Indian cooking. We source it directly from farmers and process it through a suitable food-processing partner to ensure clean, uniform dal for your kitchen.', 'Pulses', 'https://images.pexels.com/photos/14177776/pexels-photo-14177776.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["https://images.pexels.com/photos/34693984/pexels-photo-34693984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/30204272/pexels-photo-30204272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb, 150, 'kg', 100, 'active', '{"sourcing":"Sourced directly from pulse-growing farmers wherever the supply arrangement allows.","processing":"Cleaned, split, and packaged by a suitable food-processing partner.","ingredients":"Red gram (Cajanus cajan). Split.","syntheticColourClaim":"No added synthetic colours.","highlights":["Everyday dal","Directly sourced","Uniform cleaning"]}'::jsonb, '[{"id":"toor-500","label":"500 g","price":75},{"id":"toor-1kg","label":"1 kg","price":150}]'::jsonb),
('cashews', 'cashews', 'Cashew Kernels', 'Carefully sourced cashew kernels', 'Carefully sourced cashew kernels, cleaned and graded for snacking and cooking.', 'Our cashew kernels are sourced from cashew-growing regions and processed by a suitable partner who handles cleaning, grading, and packaging. Whole, creamy kernels suitable for snacking, sweets, and cooking.', 'Nuts', 'https://images.pexels.com/photos/9811624/pexels-photo-9811624.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["https://images.pexels.com/photos/18876240/pexels-photo-18876240.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/4499222/pexels-photo-4499222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb, 960, 'kg', 100, 'active', '{"sourcing":"Sourced from cashew-growing regions through direct arrangements wherever possible.","processing":"Cleaned, graded, and packaged by a suitable food-processing partner.","ingredients":"Cashew kernel (Anacardium occidentale).","syntheticColourClaim":"No added synthetic colours.","highlights":["Whole kernels","Carefully graded","Hygienic packing"]}'::jsonb, '[{"id":"cashew-250","label":"250 g","price":240},{"id":"cashew-500","label":"500 g","price":480},{"id":"cashew-1kg","label":"1 kg","price":960}]'::jsonb),
('seasonal-farm-products', 'seasonal-farm-products', 'Seasonal Farm Products', 'Additional agricultural products as we grow', 'As our farmer network grows, we add seasonal agricultural products — sourced with the same direct, honest approach.', 'Our catalogue expands as we build more direct relationships with farmers. Seasonal products may include additional pulses, whole spices, grains, and other agricultural products — all sourced with the same focus on direct farmer connections, quality, and honest information.', 'Seasonal', 'https://images.pexels.com/photos/6086066/pexels-photo-6086066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '["https://images.pexels.com/photos/7208238/pexels-photo-7208238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", "https://images.pexels.com/photos/31280796/pexels-photo-31280796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb, 0, 'varies', 0, 'active', '{"sourcing":"Sourced directly from farmers in our growing network.","processing":"Processed appropriately depending on the product, by suitable partners.","ingredients":"Varies by product. Full ingredient and sourcing information provided on each pack.","syntheticColourClaim":"Product-specific claims stated on each pack, where verified.","highlights":["Growing catalogue","Seasonal selection","Same direct sourcing"]}'::jsonb, '[{"id":"seasonal-varies","label":"Varies","price":0}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

CREATE OR REPLACE FUNCTION public.set_products_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_set_updated_at ON public.products;
CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_products_updated_at();

REVOKE EXECUTE ON FUNCTION public.set_products_updated_at() FROM PUBLIC, anon, authenticated;
